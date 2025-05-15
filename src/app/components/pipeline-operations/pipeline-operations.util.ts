import { ImageItem } from '@/app/components/new/images-context';

export function filesToImageDataAsync(files: File[]): Promise<ImageData[]> {
    return new Promise((resolve, reject) => {
        const imageDataArray: ImageData[] = new Array(files.length); // Inicializar com o tamanho correto
        let filesProcessed = 0;

        // Função para processar um único arquivo
        function processFile(file: File, index: number) {
            const reader = new FileReader();

            reader.onload = function (event) {
                const img = new Image();

                img.onload = function () {
                    const canvas = document.createElement('canvas');
                    const ctx = canvas.getContext('2d')!;

                    canvas.width = img.width;
                    canvas.height = img.height;

                    ctx!.drawImage(img, 0, 0);

                    // Obter os dados da imagem (ImageData)
                    const imageData = ctx!.getImageData(
                        0,
                        0,
                        canvas.width,
                        canvas.height,
                    );

                    // Armazenar o ImageData na posição correta
                    imageDataArray[index] = imageData;

                    // Verificar se todos os arquivos foram processados
                    filesProcessed++;

                    if (filesProcessed === files.length) {
                        resolve(imageDataArray); // Resolver a promise com todos os ImageData
                    }
                };

                img.onerror = function () {
                    reject(
                        new Error(`Erro ao carregar a imagem: ${file.name}`),
                    ); // Tratar erro de carregamento
                };

                img.src = <string>event.target!.result;
            };

            reader.onerror = function () {
                reject(new Error(`Erro ao ler o arquivo: ${file.name}`)); // Tratar erro de leitura
            };

            reader.readAsDataURL(file); // Ler o arquivo como URL de dados
        }

        // Iterar sobre todos os arquivos e processá-los
        for (let i = 0; i < files.length; i++) {
            processFile(files[i], i); // Passar o índice do arquivo para manter a ordem
        }
    });
}

export async function imageDataToFileAsync(
    imageData: ImageData,
    filename = 'image.png',
) {
    // 1. Criar um canvas e desenhar o ImageData nele
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d')!;

    canvas.width = imageData.width;
    canvas.height = imageData.height;

    ctx.putImageData(imageData, 0, 0);

    // TODO: Make this configurable
    const dataURL = canvas.toDataURL('image/png'); // ou 'image/jpeg' se preferir

    // 3. Converter a URL de dados em um Blob
    return await fetch(dataURL)
        .then((response) => response.blob())
        .then((blob) => {
            // 4. Criar um File a partir do Blob
            const file = new File([blob], filename, { type: 'image/png' }); // ou 'image/jpeg' se for o caso
            return file;
        })
        .catch((error) => console.error('Error converting to Blob:', error));
}

export async function downloadImageAsync(item: ImageItem): Promise<void> {
    const file = await imageDataToFileAsync(item.data);

    if (file == null) {
        return;
    }
    const link = document.createElement('a');
    const url = URL.createObjectURL(file);
    link.href = url;
    link.download = item.name;

    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}
