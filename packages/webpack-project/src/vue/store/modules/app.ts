import {
    VuexModule,
    Module,
    Mutation,
    Action,
    getModule,
} from "vuex-module-decorators";
import store from "../index";

export interface IAppState {
    username: string;
}

@Module({ dynamic: true, store, name: "app" })
class App extends VuexModule implements IAppState {
    public username = "world";

    @Mutation
    private UPDATE_USER(str: string) {
        this.username = str;
    }

    @Action
    public updateUser(str: string) {
        this.UPDATE_USER(str);
    }
}

export const AppModule = getModule(App);
