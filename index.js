async function uploadImage() {
    if (localStorage.getItem('uploadDone')) {
        alert("Você já fez um envio. Apenas um envio é permitido.");
        return;
    }
    const formData = new FormData();
    const imageInput = document.getElementById('imageInput');
    const nomesInput = document.getElementById('namesInput');
    if (imageInput.files.length > 0) {
        if(nomesInput.value != ''){
            const file = imageInput.files[0];
            formData.append('image', file);
            formData.append('names', nomesInput.value);            
    
            const response = await fetch('https://fotos-back.vercel.app/upload', {
                method: 'POST',
                body: formData,
            });
            if(response.status == 200){
                alert("Cadastro realizado com sucesso!!!");
                localStorage.setItem('uploadDone', true);
            }else{
                console.log(response);
                alert("Algo deu errado, tente novamente mais tarde!!!");
            }
        }else{
            alert("Por favor, Adicione o nome dos participantes.");
        }        
    } else {
        alert("Por favor, selecione uma imagem para enviar.");
    }
}

function previewImage(event) {
    const input = event.target;
    const reader = new FileReader();

    reader.onload = function () {
        const dataURL = reader.result;
        const imageInputDiv = document.getElementById('imageInput');
        imageInputDiv.style.backgroundImage = `url(${dataURL})`;
        imageInputDiv.style.backgroundSize = 'cover';
        imageInputDiv.style.backgroundPosition = 'center';
    }

    if (input.files && input.files[0]) {
        reader.readAsDataURL(input.files[0]);
    }
}

function showDuvida(){
    let explicacao = document.getElementById('explicacao');
    explicacao.style.zIndex = '1';
    explicacao.style.opacity = '1';    
}
function hideDuvidas(){
    let explicacao = document.getElementById('explicacao');
    explicacao.style.zIndex = '-5';
    explicacao.style.opacity = '0';
}