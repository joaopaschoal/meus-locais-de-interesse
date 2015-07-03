<nav class="navbar navbar-default" role="navigation">
   <div class="navbar-header">
      <button type="button" class="navbar-toggle" data-toggle="collapse" 
         data-target="#example-navbar-collapse">
         <span class="sr-only">Toggle navigation</span>
         <span class="icon-bar"></span>
         <span class="icon-bar"></span>
         <span class="icon-bar"></span>
      </button>
      <a class="navbar-brand" href="#">
        <img id="img_app_icon" src="<?=WEB_ROOT?>img/icon_marker.png" />
        <h1 id="h1_app_title">Meus Locais de Interesse</h1>
      </a>
   </div>
   <div class="collapse navbar-collapse" id="example-navbar-collapse">
      <ul class="nav navbar-nav">
         <li id="menu_add_layer"><a href="#">Adicionar Layer</a></li>
         <li><a href="#">SVN</a></li>
         

         <li class="dropdown">
            <a href="#" class="dropdown-toggle" data-toggle="dropdown">
               Java <b class="caret"></b>
            </a>
            <ul class="dropdown-menu">
               <li><a href="#">jmeter</a></li>
               <li><a href="#">EJB</a></li>
               <li><a href="#">Jasper Report</a></li>
               <li class="divider"></li>
               <li><a href="#">Separated link</a></li>
               <li class="divider"></li>
               <li><a href="#">One more separated link</a></li>
            </ul>
         </li>
      </ul>
   </div>
</nav>