;
import getCurrentUser from "./action/getCurrentUser";
import getListings from "./action/getListings";
import ClientOnly from "./components/ClientOnly";
import EmptyState from "./components/EmptyState";
import Container from "./components/container";
import ListingCard from "./components/listings/listingCard";


export default async function Home() {
  const listings= await getListings();
  const currentUser = await getCurrentUser();

 if(listings.length === 0){
  return(
    <ClientOnly>
      <EmptyState showReset/>
    </ClientOnly>
  )
 }


  return (
    <ClientOnly>
      <Container>
        <div className="pt-24 grid grid-clos-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
         {listings.map((listing: any)=>{
          return(
            <ListingCard
            currentUser={currentUser}
             key={listing.id}
             data={listing}
            />
          )
         })}

        </div>
      </Container>
      </ClientOnly>

  )
}
