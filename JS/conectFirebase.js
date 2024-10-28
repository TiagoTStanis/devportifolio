import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-analytics.js";
import { getStorage, ref, listAll, getDownloadURL } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-storage.js";

const firebaseConfig = {
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const storage = getStorage(app);

async function loadDynamicContent() {
    const contentContainer = document.getElementById("contentContainer");
    contentContainer.className = 'content-container';

    const categories = ['site', 'programa'];

    const descriptionBox = document.createElement('div');
    descriptionBox.className = 'description-box';
    contentContainer.appendChild(descriptionBox);

    for (const category of categories) {
        const categoryRef = ref(storage, category);
        const list = await listAll(categoryRef);

        if (list.items.length > 0) {
            for (const itemRef of list.items) {
                const box = document.createElement('div');
                box.className = 'content-box';

                const fileName = itemRef.name.split('.').slice(0, -1).join('.');

                const title = document.createElement('h3');
                title.textContent = fileName;
                box.appendChild(title);

                const descriptionRef = ref(storage, `Info/${fileName}.txt`);
                
                try {
                    const descriptionURL = await getDownloadURL(descriptionRef);
                    const response = await fetch(descriptionURL);
                    
                    if (response.ok) {
                        const descriptionText = await response.text();

                        box.addEventListener("mouseenter", () => {
                            descriptionBox.textContent = descriptionText;
                            descriptionBox.style.display = "block";
                        
                            const boxRect = box.getBoundingClientRect();
                            descriptionBox.style.top = `${boxRect.top + window.scrollY}px`;
                            descriptionBox.style.left = `${boxRect.right + 10}px`;
                        });
                        
                        box.addEventListener("mouseleave", () => {
                            setTimeout(() => {
                                if (!descriptionBox.matches(':hover')) {
                                    descriptionBox.style.display = "none";
                                }
                            }, 100);
                        });
                        
                        descriptionBox.addEventListener("mouseleave", () => {
                            descriptionBox.style.display = "none";
                        });
                    } else {
                        console.error(`Failed to fetch description for ${fileName}.txt`);
                    }
                } catch (error) {
                    console.error("Erro ao carregar a descrição:", error);
                }

                if (category === 'site') {
                    const siteURL = await getDownloadURL(itemRef);
                    const sitePreview = document.createElement('iframe');

                    const response1 = await fetch(siteURL);
                    const linkText1 = (await response1.text()).trim();

                    sitePreview.className = 'site-preview';
                    sitePreview.src = linkText1;

                    const visitButton = document.createElement('button');
                    visitButton.textContent = 'Visitar Site';
                    visitButton.onclick = () => window.open(linkText1, '_blank');

                    box.appendChild(sitePreview);
                    box.appendChild(visitButton);

                } else if (category === 'programa') {
                    const programContent = document.createElement('div');
                    programContent.className = 'program-content';

                    const logoRef = ref(storage, `logo/${fileName}.png`);
                    try {
                        const logoURL = await getDownloadURL(logoRef);
                        const logoImage = document.createElement('img');
                        logoImage.src = logoURL;
                        logoImage.alt = `Logo de ${fileName}`;
                        logoImage.className = 'project-logo';
                        programContent.appendChild(logoImage);
                    } catch (error) {
                        console.error("Erro ao carregar a logo:", error);
                    }

                    const zipRef = ref(storage, `programa/${fileName}.zip`);
                    try {
                        const downloadURL = await getDownloadURL(zipRef);
                        const downloadButton = document.createElement('button');
                        downloadButton.textContent = 'Baixar Programa';
                        downloadButton.className = 'download-button';
                        downloadButton.onclick = () => window.open(downloadURL, '_blank');
                        programContent.appendChild(downloadButton);
                    } catch (error) {
                        console.error("Arquivo .zip não encontrado para download:", error);
                    }

                    box.appendChild(programContent);
                }

                contentContainer.appendChild(box);
            }
        }
    }
}

document.addEventListener("DOMContentLoaded", loadDynamicContent);
