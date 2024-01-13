import EmptyState from "../components/EmptyState";
 import ClientOnly from "../components/ClientOnly";

 import getCurrentUser from "../action/getCurrentUser";
 import getReservation from "../action/getReservation";

 import TripsClient from "./tripsClient";

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

    const reservations = await getReservation({
        userId: currentUser.id
    })

    if(reservations.length === 0){
        return(
              <ClientOnly>
                <EmptyState
                    title="No trip Found"
                    subtitle="Looks like you havent reserved any trips."
                />
              </ClientOnly>
        )
    }
    return(
        
        <ClientOnly>
            <TripsClient
                reservations={reservations}
                currentUser={currentUser}
            />
        </ClientOnly>
    )
 }

 export default TripPage