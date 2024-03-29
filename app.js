// API ENDPOINT : `https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&origin=*&srlimit=20&srsearch=${searchInput}`

const form = document.getElementById('form');
const mySearch = document.getElementById('search') ;
const wikiResult = document.getElementById('wikiResult');
const loading = document.getElementById('loading') ;
form.addEventListener('submit' , handleEvent) ;

function handleEvent(e) {
    e.preventDefault();
    let searchInput = mySearch.value ;
    console.log(searchInput);
    getWipediaLinks(searchInput) ;
    wikiResult.textContent = "";
}

async function getWipediaLinks (searchInput) {
    if (!searchInput) {
            console.log("woops y'a rien") ;
            document.getElementById('warning').textContent = "Woops y'a rien" ;
    } else {
            document.getElementById('warning').textContent = "" ;
            const url = `https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&origin=*&srlimit=20&srsearch=${searchInput}` ;
            try {
                loading.style = "display: block" ;
                var requete = await fetch (url) ;
            } 
            catch (error) {
                console.log("Votre connexion internet est perdue , Ressayez plustard") ;
                document.getElementById('warning').textContent = "Votre connexion internet est perdue , Ressayez plustard" ;

            }
            if (requete.ok) {
                let data = await requete.json() ;
                loading.style = "display: none" ;
                console.log("resultat des data recuperer" , data);
                let results = data.query.search ;

                if (! results.length) {
                    console.log("Votre recherche ne contient pas de resultat");
                    document.getElementById('warning').innerHTML = "<p class ='text-dark'>Votre recherche ne contient pas de resultat</p>";
                    return
                } else {
                    console.log("resultat du search dans json" , results) ;
                    showResult(results) ;
                }
            
            }
            else {
                console.log(" Oops Un probleme est survenue avec le serveur de Wikipedia , Ressayez plustard") ;
                console.log("HTTP Error : " , requete.status) ;
                document.getElementById('warning').textContent = `HTTP Error : ${requete.status}` ;
                loading.style = "display: none" ;
            }
            
    }

}

function showResult (results) {
    results.forEach((result , index) => {
        let div = document.createElement('div') ;
        div.className = "fs-6 fw-medium" ;
        div.style = `overflow-wrap: break-word;` ;
        wikiResult.append(div);
        let link = `https://en.wikipedia.org/?curid=${result.pageid}` ;
        const resultats = `<div class ="mt-3"> 
                                <h2><a href = "${link}" target =" _blank">${result.title}</a></h2>
                                <h6><a href=${link} target="_blank" class ="text-success">${link}</a></h6>
                                <p>${result.snippet}</p> 
                            </div>` ;
        
        div.innerHTML = resultats;
    })

    console.log(wikiResult);
    
}

