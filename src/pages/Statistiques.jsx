import { useEffect,useState } from "react"
import dbPromise from "../db/database"

function Statistiques(){

const [depenses,setDepenses]=useState([])

useEffect(()=>{

chargerDonnees()

},[])


async function chargerDonnees(){

const db=await dbPromise

const data=await db.getAll(
"depenses"
)

setDepenses(data)

}

const nombreOperations=
depenses.length

const revenus=
depenses.filter(
item=>item.type==="revenu"
)

const depensesListe=
depenses.filter(
item=>item.type==="depense"
)

const totalRevenus=
revenus.reduce(
(total,item)=>total+item.montant,
0
)

const totalDepenses=
depensesListe.reduce(
(total,item)=>total+item.montant,
0
)

const solde=
totalRevenus-totalDepenses


return(

<div className="container">

<h1>📊 Statistiques</h1>

<div className="cards">

<div className="card">

<h2>Opérations</h2>

<h3>
{nombreOperations}
</h3>

</div>


<div className="card">

<h2>Revenus</h2>

<h3>

{revenus.length}

</h3>

</div>


<div className="card">

<h2>Dépenses</h2>

<h3>

{depensesListe.length}

</h3>

</div>


<div className="card">

<h2>Solde</h2>

<h3>

{solde} FCFA

</h3>

</div>

</div>

<div className="liste">

<h2>Résumé</h2>

<div className="depense">

<p>Total revenus</p>

<strong>
{totalRevenus} FCFA
</strong>

</div>

<div className="depense">

<p>Total dépenses</p>

<strong>

{totalDepenses} FCFA

</strong>

</div>

</div>

</div>

)

}

export default Statistiques