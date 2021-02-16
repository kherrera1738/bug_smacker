// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.

import Rails from "@rails/ujs";
import Turbolinks from "turbolinks";
import * as ActiveStorage from "@rails/activestorage";
import "channels";

Rails.start();
Turbolinks.start();
ActiveStorage.start();
require("jquery");

document.addEventListener("turbolinks:load", () => {
  function openNav() {
    const sidebar = document.getElementById("mySidebar");
    sidebar.dataset.open = "true";
    sidebar.style.width = "250px";
    // document.getElementById("main").style.marginLeft = "250px";
  }

  function closeNav() {
    const sidebar = document.getElementById("mySidebar");
    sidebar.dataset.open = "false";
    sidebar.style.width = "0";
    // document.getElementById("main").style.marginLeft = "0";
  }

  function toggleNav() {
    const sidebar = document.getElementById("mySidebar");
    const isOpen = sidebar.dataset.open;
    if (isOpen === "true") {
      closeNav();
    } else {
      openNav();
    }
  }

  var openBtn = document.getElementById("navbtn");
  openBtn.addEventListener("click", toggleNav, false);
});
// Support component names relative to this directory:
var componentRequireContext = require.context("components", true);
var ReactRailsUJS = require("react_ujs");
ReactRailsUJS.useContext(componentRequireContext);
