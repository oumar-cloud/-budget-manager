import Card from "../components/Card"
import { useState,useEffect } from "react"
import dbPromise from "../db/database"

function Home(){

const [nom,setNom]=useState("")
const [montant,setMontant]=useState("")
const [categorie,setCategorie]=useState("")
const [autreCategorie,setAutreCategorie]=useState("")
const [type,setType]=useState("depense")
const [recherche,setRecherche]=useState("")
const [depenses,setDepenses]=useState([])
const [idModifier,setIdModifier]=useState(null)

useEffect(()=>{

chargerDepenses()

},[])

async function chargerDepenses(){

const db=await dbPromise

const data=await db.getAll("depenses")

setDepenses(data)

}

async function ajouterDepense(){

if(
nom==="" ||
montant==="" ||
categorie===""
){

alert("Veuillez remplir tous les champs")
return

}

const db=await dbPromise

const categorieFinale=

categorie==="Autre"
?
autreCategorie
:
categorie

const nouvelleDonnee={

nom,
montant:Number(montant),
type,
categorie:categorieFinale,
date:new Date().toLocaleDateString()

}

if(idModifier){

nouvelleDonnee.id=idModifier

await db.put(
"depenses",
nouvelleDonnee
)

setIdModifier(null)

}else{

await db.add(
"depenses",
nouvelleDonnee
)

}

chargerDepenses()

setNom("")
setMontant("")
setCategorie("")
setAutreCategorie("")
setType("depense")

}

function modifierDepense(item){

setNom(item.nom)
setMontant(item.montant)
setCategorie(item.categorie)
setType(item.type)

setIdModifier(item.id)

}

async function supprimerDepense(id){

const db=await dbPromise

await db.delete(
"depenses",
id
)

chargerDepenses()

}

const revenu=depenses
.filter(item=>item.type==="revenu")
.reduce(
(total,item)=>total+item.montant,
0
)

const totalDepenses=depenses
.filter(item=>item.type==="depense")
.reduce(
(total,item)=>total+item.montant,
0
)

const solde=
revenu-totalDepenses


const depensesFiltrees=
depenses.filter(

(item)=>

item.nom
.toLowerCase()
.includes(
recherche.toLowerCase()
)

)


return(

<div className="container">

<h1>
💰 Budget Manager
</h1>


<div className="cards">

<Card
title="Solde"
amount={solde}
/>

<Card
title="Revenus"
amount={revenu}
/>

<Card
title="Dépenses"
amount={totalDepenses}
/>

</div>


<div className="formulaire">

<input
type="text"
placeholder="Nom"
value={nom}
onChange={(e)=>setNom(e.target.value)}
/>


<input
type="number"
placeholder="Montant"
value={montant}
onChange={(e)=>setMontant(e.target.value)}
/>


<select
value={type}
onChange={(e)=>{

setType(
e.target.value
)

setCategorie("")
setAutreCategorie("")

}}
>

<option value="depense">

Dépense

</option>

<option value="revenu">

Revenu

</option>

</select>


<select
value={categorie}
onChange={(e)=>setCategorie(e.target.value)}
>

<option value="">

Choisir catégorie

</option>

{

type==="depense"

?

<>

<option>

Transport

</option>

<option>

Alimentation

</option>

<option>

Loisir

</option>

<option>

Santé

</option>

<option>

Autre

</option>

</>

:

<>

<option>

Salaire

</option>

<option>

Commerce

</option>

<option>

Cadeau

</option>

<option>

Autre

</option>

</>

}

</select>


{

categorie==="Autre"

&&

<input
type="text"
placeholder="Entrer une catégorie"
value={autreCategorie}
onChange={(e)=>
setAutreCategorie(
e.target.value
)
}
/>

}


<button
onClick={ajouterDepense}
>

{idModifier

?

"Modifier"

:

"Ajouter"

}

</button>

</div>


<div className="recherche">

<input
type="text"
placeholder="Rechercher..."
value={recherche}
onChange={(e)=>
setRecherche(
e.target.value
)
}
/>

</div>


<div className="liste">

<h2>

Historique

</h2>

{

depensesFiltrees.map(

(item)=>(

<div
className="depense"
key={item.id}
>

<div>

<p>

{item.nom}

</p>

<small>

{item.montant}
FCFA

({item.type})

</small>

<br/>

<small>

🏷 {item.categorie}

</small>

<br/>

<small>

📅 {item.date}

</small>

</div>

<div>

<button
className="modifier"
onClick={()=>
modifierDepense(item)
}
>

✏️

</button>

<button
className="supprimer"
onClick={()=>
supprimerDepense(item.id)
}
>

🗑

</button>

</div>

</div>

)

)

}

</div>

</div>

)

}

export default Home