

import Container  from "../components/container";
import { safeListings, safeUser } from "../types";
import Heading from "../components/Heading";
import ListingCard from "../components/listings/listingCard";



interface FavoritesClientProps{
    listings: safeListings[];
    currentUser?: safeUser | null;
    
}


const FavoritesClient: React.FC<FavoritesClientProps> = ({
    listings,
    currentUser
   
}) =>{
    return(

        <Container>
            <Heading
            title="My Favorites"
            subtitle="A list of your favorited!"
            />
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
            {listings.map((listing: any)=>(
                    <ListingCard
                    currentUser={currentUser}
                    key={listing.id}
                    data={listing}
                    />
                ))}
            </div>
        </Container>
    )
}

export default FavoritesClient;