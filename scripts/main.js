//import the formApp that holds our Party Sheet
import { PSWindow } from "./pswindow.js"
class PSApp {
    //Create a button in the footer of the actors sidebar and launch the party sheet 
    static createButton = () => {
        //if not GM or elevated user => no button
        if (!game.user.isGM && !Actor.canUserCreate(game.user)) {
            return;
        }
        
        let psButton = document.getElementById("ps-button");
        if (psButton != null) { //is the button already there ?
            return;
        }
            
        //get access to the actor sidebar then footer
        const actorsPanel = document.getElementById("actors");
        const actorFooter = actorsPanel.getElementsByClassName("directory-footer")[0];
        if (actorFooter) {
            //SBUtils.log("Creating Statblock Parse button.");
            
            psButton = document.createElement("button");
            psButton.innerHTML = `<i id="ps-button" class="fas fa-address-card"></i>Party Sheet`;
            psButton.onclick = ev => PSApp.openPSForm(); //On click invoke openPSForm
  
            const createEntityButton = actorFooter.getElementsByClassName("create-entity")[0];
            actorFooter.insertBefore(psButton, createEntityButton);
        }
    }

    static openPSForm= () => {
        let myPSWindow = new PSWindow();
        myPSWindow.render(true);
    }
}

//Initialize Party Sheet
Hooks.once('init', async function () {
   console.log("Initializing Party Sheet");

   //Initializing actors list client wide
   await game.settings.register("party-sheet", "actorsIdListSettings",{
    default: [],
    type: Object,
    config: false,   
   });
});

//Hook that let us put a button in the footer of the actors sidebar
Hooks.on("renderSidebarTab", async (app, html) => {
    if (app.options.id == "actors") {
        PSApp.createButton();
    }
});