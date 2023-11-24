import { Commande } from "./commande.model";

export class Achat {
    nom!: string;
    prenom!: string;
    ville!: string;
    tel!: number;
    tel2!: number;
    email!: string;
    livraison!: string;
    commandes!: Commande[];
}