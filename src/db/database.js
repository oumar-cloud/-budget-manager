import { openDB } from "idb"

const dbPromise = openDB(
    "budgetDB",
    1,
    {
        upgrade(db){

            if(!db.objectStoreNames.contains("depenses")){

                db.createObjectStore(
                    "depenses",
                    {
                        keyPath:"id",
                        autoIncrement:true
                    }
                )

            }

        }
    }
)

export default dbPromise