import { PartySheetApp } from "./partysheet.js"



//PartySheet class
class PartySheet {
  static openPartySheet = () => {
    //const html = await renderTemplate("modules/party-sheet/scripts/myFormApplication.html");
    let data = PartySheet.prepareData();
    const template_file = "modules/party-sheet/html-templates/test_template.html";
    //const template_data = {
    //  str: data["str"].value,
    //  dex: data["dex"].value,
    //  con: data["con"].value,
    //  int: data["int"].value,
    //  wis: data["wis"].value,
    //  cha: data["cha"].value
    //};
    
    let temp = [];
    data.forEach(e=>{
      temp.push({
          str: e["str"].value,
          dex: e["dex"].value,
          con: e["con"].value,
          int: e["int"].value,
          wis: e["wis"].value,
          cha: e["cha"].value
        }
      )
    }
  );
    let template_data = {persons: temp};
    console.log(template_data);
    new PartySheetApp(template_data, {template: template_file}).render(true);
}

  static partysheetButton = () => {
      console.log('Coucou tu es là !');
          if (!game.user.isGM && !Actor.canUserCreate(game.user)) {
              return;
          }

          let partySheetButton = document.getElementById("PartySheet-button");
          if (partySheetButton != null) {
              return;
          }

          const actorsPanel = document.getElementById("actors");
          const actorFooter = actorsPanel.getElementsByClassName("directory-footer")[0];
          if (actorFooter) {
              //SBUtils.log("Creating Statblock Parse button.");

              partySheetButton = document.createElement("button");
              partySheetButton.innerHTML = `<i id="PartySheet-button" class="fas fa-address-card"></i>Party Sheet`;
              partySheetButton.onclick = ev => PartySheet.openPartySheet();//console.log('tu as cliké');

              const createEntityButton = actorFooter.getElementsByClassName("create-entity")[0];
              actorFooter.insertBefore(partySheetButton, createEntityButton);
          }
  }

  static prepareData = () => {
    let listeActeur = [];
    game.actors.forEach(actor => {
      if (actor.data.type === "character") {
        listeActeur.push(actor.data.data.abilities);
      }
    })
    return listeActeur;
  }
}

//Crochet qui permet de créer et d'afficher le bouton de Party Sheet
Hooks.on("renderSidebarTab", async (app, html) => {
    if (app.options.id == "actors") {
        PartySheet.partysheetButton();
    }
});
