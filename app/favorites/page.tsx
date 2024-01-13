import EmptyState from "../components/EmptyState";
import ClientOnly from "../components/ClientOnly";

import getCurrentUser from "../action/getCurrentUser";
import getFavoriteListings from "../action/getFavoriteListings";
import FavoritesClient from "./favoritesClient";

const ListingPage = async () => {

    const listings = await getFavoriteListings();
    const currentUser = await getCurrentUser();

    if(listings.length === 0){
    return (
        <ClientOnly>
            <EmptyState
                title="No Favorites found"
                subtitle="Looks like you don't have any favorites yet."
            />
        </ClientOnly>
    )
}
    return(
        <ClientOnly>
            <FavoritesClient
            listings={listings}
            currentUser={currentUser}
             />
        </ClientOnly>
    )

   
}

export default ListingPage;
