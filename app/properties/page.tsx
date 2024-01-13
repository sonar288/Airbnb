import EmptyState from "../components/EmptyState";
 import ClientOnly from "../components/ClientOnly";

 import getCurrentUser from "../action/getCurrentUser";
 import getListings from "../action/getListings";

 import PropertiesClient from "./propertiesClient";

 const TripPage = async ()=>{
    const currentUser = await getCurrentUser();
     
    if(!currentUser){
        return (
            <ClientOnly>
                <EmptyState
                title="unauthorized"
                subtitle="Please login"
                />
            </ClientOnly>
        )
    }

    const listings = await getListings({
        userId: currentUser.id
    })

    if(listings.length === 0){
        return(
              <ClientOnly>
                <EmptyState
                    title="No Properties Found"
                    subtitle="Looks like you have no properties."
                />
              </ClientOnly>
        )
    }
    return(
        
        <ClientOnly>
            <PropertiesClient
            listings={listings}
            currentUser={currentUser}
            />
        </ClientOnly>
    )
 }
 export default TripPage;