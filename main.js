document.addEventListener('DOMContentLoaded', () => {
	const form = document.getElementById("form"),
		messageBox = document.querySelector('.message-box'),
		input = document.querySelectorAll('.form__input'),
		phone = document.getElementById('tel');
	let isValid = false;


	form.addEventListener('submit', formValidator);
	const message = {
		loading: 1,
		success: 'Thank you, I will contact with you soon',
	};

	function formValidator(e) {
		e.preventDefault();
		isValid = form.checkValidity();
		if (isValid && phoneValidator) {
			processData();
		}
	}
	function processData() {
		const r = new XMLHttpRequest();
		r.open('POST', "server.php");
		const formData = new FormData(form);
		r.send(formData);
		r.addEventListener('load',() => {
			if (r.status === 200) {
				console.log('yes');
				
				messageModal(message.success);
				form.reset();
				return;
			} else {
				console.log(messageModal(processFailed(r.response)));
				
				messageModal(processFailed(r.response));
			}
		});
	

		function processFailed(status) {
			return `Something gone wrong while sending the form!
				message:${status}
				`;
		}
	}
	function messageModal(message) {
		messageBox.textContent = message;
	}
	function phoneValidator() {
		return !/^[-\s\./0-9]*$/.test(phone.value);
	}
});