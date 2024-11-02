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
    for (const category of categories) {
        const categoryRef = ref(storage, category);
        const list = await listAll(categoryRef);
        window.scrollTo(0, 0);
        if (list.items.length > 0) {
            for (const itemRef of list.items) {
                const box = document.createElement('div');
                box.className = 'content-box';

                const fileName = itemRef.name.split('.').slice(0, -1).join('.');

                const contentText = document.createElement('div');
                contentText.className = 'content-text';

                const title = document.createElement('h3');
                title.textContent = fileName;

                const gitHubRef = ref(storage, `git/${fileName}.txt`);
                try {
                    const gitHubURL = await getDownloadURL(gitHubRef);
                    const response = await fetch(gitHubURL);

                    if (response.ok) {
                        const gitHubLink = await response.text();
                        const gitHubIcon = document.createElement('a');
                        gitHubIcon.href = gitHubLink.trim();
                        gitHubIcon.target = '_blank';
                        gitHubIcon.innerHTML = '<i class="fab fa-github"></i>';
                        gitHubIcon.className = 'github-icon';

                        title.appendChild(gitHubIcon);
                    }
                } catch (error) {
                    console.error("Erro ao carregar o link do GitHub:", error);
                }

                contentText.appendChild(title);

                if (category === 'programa') {
                    const logoRef = ref(storage, `logo/${fileName}.png`);
                    try {
                        const logoURL = await getDownloadURL(logoRef);
                        const logoImage = document.createElement('img');
                        logoImage.src = logoURL;
                        logoImage.alt = `Logo de ${fileName}`;
                        logoImage.className = 'project-logo';

                        contentText.appendChild(logoImage);
                    } catch (error) {
                        console.error("Erro ao carregar a logo:", error);
                    }
                }

                const descriptionRef = ref(storage, `Info/${fileName}.txt`);
                try {
                    const descriptionURL = await getDownloadURL(descriptionRef);
                    const response = await fetch(descriptionURL);

                    if (response.ok) {
                        const descriptionText = await response.text();
                        const descriptionParagraph = document.createElement('p');
                        descriptionParagraph.textContent = descriptionText;
                        contentText.appendChild(descriptionParagraph);
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
                    box.appendChild(contentText);
                    box.appendChild(visitButton);
                    window.scrollTo(0, 0);

                } else if (category === 'programa') {
                    const downloadButton = document.createElement('button');
                    downloadButton.textContent = 'Baixar Programa';
                    downloadButton.className = 'download-button';
                    downloadButton.onclick = async () => {
                        const zipURL = await getDownloadURL(ref(storage, `programa/${fileName}.zip`));
                        window.open(zipURL, '_blank');
                    };

                    box.appendChild(contentText);
                    box.appendChild(downloadButton);
                }

                contentContainer.appendChild(box);
            }
        }
    }
}

document.addEventListener("DOMContentLoaded", () => {
    loadDynamicContent();
});