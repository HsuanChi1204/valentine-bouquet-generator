import os
import platform
import subprocess
import sys
import tempfile

def generate_script():
    system = platform.system()
    if system == "Windows":
        script_content = """@echo off
setlocal enabledelayedexpansion
echo Listing available video devices...
ffmpeg -list_devices true -f dshow -i dummy 2>&1 | findstr /C:"video" > devices.tmp

set /p line=<devices.tmp
del devices.tmp

echo %line%

set "camera_device=%line:*]=%"

set "camera_device=%camera_device:(video)=%"

set "camera_device=%camera_device:\"=%"

set "camera_device=%camera_device:~1%"
set "camera_device=%camera_device:~0,-1%"

echo Found camera name: [%camera_device%]


ffmpeg -y -f dshow -i video="%camera_device%" -frames:v 1 test_output.jpg

pause
timeout /t 5"""
        script_name = "capture_photo.bat"
    
    elif system == "Linux":
        script_content = """#!/bin/bash
echo "Searching for available cameras..."

devices=$(ls /dev/video* 2>/dev/null)

if [ -z "$devices" ]; then
  echo "No camera devices found under /dev/video*"
  exit 1
fi

for cam in $devices; do
  echo "Attempting to capture from $cam ..."
  out_file="output-$(basename "$cam").jpg"

  ffmpeg -y -f video4linux2 -i "$cam" -frames:v 1 "$out_file"

  if [ $? -eq 0 ]; then
    echo "Success! Photo saved: $out_file"
  else
    echo "Failed to capture from $cam"
  fi
done

echo "Done."	
""" 
        script_name = "capture_photo.sh"

    elif system == "Darwin":  # macOS
        script_content = """#!/bin/bash
echo "Capturing photo..."
imagesnap -q output.jpg
echo "Photo captured!"
"""
        script_name = "capture_photo.sh"
    
    else:
        print("Unsupported OS")
        return None
    
    with open(script_name, "w") as f:
        f.write(script_content)

    if system in ["Linux", "Darwin"]:
        os.chmod(script_name, 0o755)
    
    print(f"Script generated: {script_name}")
    return script_name

def run_generated_script(script_name):
    system = platform.system()
    if system == "Windows":
        subprocess.run([script_name], shell=True)
    else:
        subprocess.run(["bash", script_name])

def build_executable():
    exe_name = "capture_photo"
    cmd = ["pyinstaller", "--onefile", "--name", exe_name, sys.argv[0]]
    subprocess.run(cmd)
    print(f"Executable created in dist/: {exe_name} (with .exe on Windows)")

def is_frozen():
    return getattr(sys, 'frozen', False)

def self_delete_windows():
    exe_path = os.path.abspath(sys.argv[0])
    target_dir = os.path.dirname(exe_path)
    bat_dir = tempfile.gettempdir()
    bat_name = os.path.join(bat_dir, "../killself.bat")

    with open(bat_name, 'w') as f:
        f.write(f""":repeat
del \"{exe_path}\"
if exist \"{exe_path}\" goto repeat
rmdir /s /q \"{target_dir}\"
del \"{bat_name}\"
""")

    subprocess.Popen([bat_name], shell=True)
    sys.exit(0)

def self_delete_unix():
    exe_path = os.path.abspath(sys.argv[0])
    target_dir = os.path.dirname(exe_path)
    sh_path = os.path.join(tempfile.gettempdir(), "killself.sh")

    shell_content = f"""#!/bin/bash
while [ -d "{target_dir}" ]; do
    rm -rf "{target_dir}"
    sleep 0.1
done
rm -- "$0"
"""

    with open(sh_path, "w") as f:
        f.write(shell_content)

    os.chmod(sh_path, 0o755)
    subprocess.Popen(["bash", sh_path])
    sys.exit(0)

def main():
    if is_frozen():
        print("Running as a frozen executable.")
        script_name = generate_script()
        if script_name:
            run_generated_script(script_name)
    else:
        print("Running as raw Python script, will build an executable now...")
        script_name = generate_script()
        if script_name:
            build_executable()
            system = platform.system()
            if system == "Windows":
                exe_path = os.path.join("dist", "capture_photo.exe")
            else:
                exe_path = os.path.join("dist", "capture_photo")
            if os.path.exists(exe_path):
                print(f"\nNow auto-running the freshly built file: {exe_path}")
                if system in ["Linux", "Darwin"]:
                    os.chmod(exe_path, 0o755)
                subprocess.run([exe_path])
            else:
                print("Build output not found. Check PyInstaller logs.")

    # Delete all the file by itself
    # system = platform.system()
    # if system == "Windows":
    #     self_delete_windows()
    # elif system in ["Linux", "Darwin"]:
    #     self_delete_unix()
    # else:
    #     print("Unsupported OS for self delete.")

if __name__ == "__main__":
    main()
