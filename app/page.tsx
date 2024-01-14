;
import getCurrentUser from "./action/getCurrentUser";
import getListings,{ IListingsParams } from "./action/getListings";
import ClientOnly from "./components/ClientOnly";
import EmptyState from "./components/EmptyState";
import Container from "./components/container";
import ListingCard from "./components/listings/listingCard";

interface HomeProps {
  searchParams: IListingsParams
};

const Home = async({searchParams}: HomeProps)=>{
  const currentUser = await getCurrentUser();
  const listings = await getListings(searchParams);

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
         {listings.map((listing)=>{
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

export default Home;