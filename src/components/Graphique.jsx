import {
    PieChart,
    Pie,
    Cell,
    Tooltip
    }
    from "recharts"
    
    function Graphique({depenses}){
    
    const data=depenses
    .filter(
    item=>item.type==="depense"
    )
    .map(
    item=>({
    
    name:item.categorie,
    value:item.montant
    
    })
    )
    
    const couleurs=[
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#AA66CC"
    ]
    
    return(
    
    <div>
    
    <h2>
    📈 Répartition des dépenses
    </h2>
    
    <PieChart
    width={300}
    height={300}
    >
    
    <Pie
    data={data}
    dataKey="value"
    nameKey="name"
    outerRadius={100}
    >
    
    {
    
    data.map(
    (entry,index)=>(
    
    <Cell
    key={index}
    fill={
    couleurs[
    index%
    couleurs.length
    ]
    }
    />
    
    )
    
    )
    
    }
    
    </Pie>
    
    <Tooltip/>
    
    </PieChart>
    
    </div>
    
    )
    
    }
    
    export default Graphique