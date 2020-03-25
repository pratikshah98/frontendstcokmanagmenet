export default function({ store,redirect,route}){
    if(store.state.isAuth==false){
        return redirect('/login');
    }
}