// Ambil elemen dari DOM
const inputMeme = document.getElementById('inputMeme');
const inputStock = document.getElementById('inputStock');
const inputYield = document.getElementById('inputYield');
const inputUser = document.getElementById('inputUser');

const previewMeme = document.getElementById('previewMeme');
const previewStock = document.getElementById('previewStock');
const previewYield = document.getElementById('previewYield');
const previewUser = document.getElementById('previewUser');

const downloadBtn = document.getElementById('downloadBtn');
const captureCard = document.getElementById('captureCard');

// Fungsi Real-time Sync untuk Live Preview
function updatePreview() {
    previewMeme.textContent = inputMeme.value || "Meme Token ($MEME)";
    previewStock.textContent = inputStock.value;
    previewYield.textContent = inputYield.value || "0.0% ROI";
    
    let handle = inputUser.value.trim();
    if (!handle.startsWith('@')) {
        handle = '@' + handle;
    }
    previewUser.textContent = handle;
}

// Event Listeners untuk input form
inputMeme.addEventListener('input', updatePreview);
inputStock.addEventListener('change', updatePreview);
inputYield.addEventListener('input', updatePreview);
inputUser.addEventListener('input', updatePreview);

// Fungsi Download Card menggunakan html2canvas
downloadBtn.addEventListener('click', () => {
    downloadBtn.textContent = "Rendering Card...";
    downloadBtn.disabled = true;

    // Pastikan font dan render siap
    setTimeout(() => {
        html2canvas(captureCard, {
            scale: 3, // Kualitas tinggi (High Resolution)
            useCORS: true,
            backgroundColor: null
        }).then(canvas => {
            const link = document.createElement('a');
            link.download = `FlexStock-${inputStock.value}-Card.png`;
            link.href = canvas.toDataURL('image/png');
            link.click();

            downloadBtn.textContent = "Download Flex Card";
            downloadBtn.disabled = false;
        }).catch(err => {
            console.error("Gagal mendownload kartu:", err);
            downloadBtn.textContent = "Download Flex Card";
            downloadBtn.disabled = false;
            alert("Terjadi kesalahan saat merender gambar.");
        });
    }, 300);
});

// Inisialisasi awal
updatePreview();

