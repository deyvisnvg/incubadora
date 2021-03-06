let output = document.getElementById("output");
let modulo = document.getElementById("modulo");

switch (modulo.value) {

    case "SuperAdministrador":
        modulo = "Super Administrador"

        output.innerHTML += `
            <div class="app-header navbar">
                <div class="navbar-header bg-dark">
                    <button class="pull-right visible-xs dk" data-toggle="class:show" data-target=".navbar-collapse"
                        style="color:#ecf0f1;">
                        <i class="glyphicon glyphicon-cog"></i>
                    </button>
                    <button class="pull-right visible-xs" data-toggle="class:off-screen" data-target=".app-aside"
                        ui-scroll="app" style="color:#ecf0f1;">
                        <i class="glyphicon glyphicon-align-justify"></i>
                    </button>
                    <a href="#" class="navbar-brand text-lt">
                        <i class="fa fa-list icon text-success"></i>
                        <span class="hidden-folded m-l-xs">Incubadora</span>
                    </a>
                </div>
                <div class="collapse pos-rlt navbar-menu-wrapper navbar-collapse box-shadow bg-white-only">
                    <div class="nav navbar-nav hidden-xs">
                        <a href="#" class="btn no-shadow navbar-btn active" data-toggle="class:app-aside-folded" data-target=".app">
                            <i class="fa fa-dedent fa-fw text"></i>
                            <i class="fa fa-indent fa-fw text-active"></i>
                        </a>
                    </div>
                    <ul class="nav navbar-nav navbar-right">
                        <li class="dropdown">
                            <a href="#" data-toggle="dropdown" class="dropdown-toggle clear" data-toggle="dropdown">
                                <span class="thumb-sm avatar pull-right m-t-n-sm m-b-n-sm m-l-sm">
                                    <img src="/../img/admin.png" alt="">
                                    <i class="on md b-white bottom"></i>
                                </span>
                                <span class="hidden-sm hidden-md">
                                    <strong>${modulo}</strong>  <label></label></span>
                                </span> <b class="caret"></b>
                            </a>

                            <ul class="dropdown-menu animated fadeInRight w hidden-folded" style="width:250px">
                                <li class="wrapper b-b m-b-sm bg-light m-t-n-xs">
                                    <div>
                                        <p>Bienvenido</p>
                                    </div>
                                    <progressbar value="60" class="progress-xs m-b-none bg-white"></progressbar>
                                </li>
                                <li>
                                    <a href="/perfil">
                                        <span class="badge bg-danger pull-right">C</span>
                                        <span>Perfil</span>
                                    </a>
                                </li>
                                <li class="divider"></li>
                                <li>
                                    <a href="/perfil/configuration">
                                        <span class="badge bg-danger pull-right">C</span>
                                        <span>Configuracion de Cuenta</span>
                                    </a>
                                </li>
                                <li class="divider"></li>
                                <li>
                                    <a href="/login/logout">Salir</a>
                                </li>
                            </ul>

                        </li>
                    </ul>
                </div>
            </div>

            <div class="app-aside hidden-xs bg-dark">
                <div class="aside-wrap">
                    <div class="navi-wrap">
                        <nav ui-nav class="navi">

                            <ul class="nav">
                                <li class="hidden-folded padder m-t m-b-sm text-muted text-xs">
                                    <span translate="aside.nav.HEADER">PANEL ADMINISTRATIVO</span>
                                </li>
                                <li>
                                    <a href class="auto">
                                        <i class="fa fa-laptop icon text-success"></i>
                                        <span class="font-bold" translate="aside.nav.Mantenimiento">GESTION DE REGISTROS</span>
                                    </a>
                                    <ul class="nav nav-sub dk">
                                        <li>
                                            <a href class="auto">
                                                <i class="icon-bookmarks"></i>
                                                <span class="font-bold" translate="aside.nav.Mantenimiento">Usuario</span>
                                            </a>
                                            <ul class="nav nav-sub dk" style="display: none;">
                                                <li ui-sref-active="active">
                                                    <a href="/usuario" target='_self'><span class="margen"> Personal</span></a>
                                                </li>
                                                <li ui-sref-active="active">
                                                    <a href="/usuario/representante" target='_self'><span class="margen"> Representante Legal</span></a>
                                                </li>
                                            </ul>
                                        </li>
                                    </ul>
                                    <ul class="nav nav-sub dk">
                                        <li>
                                            <a href class="auto">
                                                <i class="icon-bookmarks"></i>
                                                <span class="font-bold" translate="aside.nav.Mantenimiento">Empresa</span>
                                            </a>
                                            <ul class="nav nav-sub dk" style="display: none;">
                                                <li ui-sref-active="active">
                                                    <a href="/empresa"><span class="margen"> Nueva Empresa</span></a>
                                                </li>
                                            </ul>
                                        </li>
                                    </ul>
                                    <ul class="nav nav-sub dk">
                                        <li>
                                            <a href class="auto">
                                                <i class="icon-bookmarks"></i>
                                                <span class="font-bold" translate="aside.nav.Mantenimiento">Cámara</span>
                                            </a>
                                            <ul class="nav nav-sub dk" style="display: none;">
                                                <li ui-sref-active="active">
                                                    <a href="/camara"><span class="margen"> Nueva Cámara</span></a>
                                                </li>
                                            </ul>
                                        </li>
                                    </ul>
                                    <ul class="nav nav-sub dk">
                                        <li>
                                            <a href class="auto">
                                                <i class="icon-bookmarks"></i>
                                                <span class="font-bold" translate="aside.nav.Mantenimiento">Pedidos</span>
                                            </a>
                                            <ul class="nav nav-sub dk" style="display: none;">
                                                <li ui-sref-active="active">
                                                    <a href="/pedido"><span class="margen"> Nuevo Pedido</span></a>
                                                </li>
                                                <li ui-sref-active="active">
                                                    <a href="/incubadora/incubacion"><span class="margen"> Incubación</span></a>
                                                </li>
                                            </ul>
                                        </li>
                                    </ul>                                   
                                    <ul class="nav nav-sub dk">
                                        <li>
                                            <a href class="auto">
                                                <i class="icon-bookmarks"></i>
                                                <span class="font-bold" translate="aside.nav.Mantenimiento">Configuración</span>
                                            </a>
                                            <ul class="nav nav-sub dk" style="display: none;">
                                                <li ui-sref-active="active">
                                                    <a href="/incubadora"><span class="margen"> Incubadora</span></a>
                                                </li>
                                                <ul class="nav nav-sub dk margensub">
                                                    <li>
                                                        <a href class="auto">
                                                            <i class="icon-radio-unchecked"></i>
                                                            <span class="font-bold" translate="aside.nav.Mantenimiento">Sesores</span>
                                                        </a>
                                                        <ul class="nav nav-sub dk" style="display: none;">
                                                            <li ui-sref-active="active">
                                                                <a href="/sensores"><span class="margen"> Nuevo Sensor</span></a>
                                                            </li>
                                                            <li ui-sref-active="active">
                                                                <a href="/sensores/tipoSensor"><span class="margen"> Tipo de Sensor</span></a>
                                                            </li>
                                                        </ul>
                                                    </li>
                                                </ul>

                                            </ul>
                                        </li>
                                    </ul>
                                </li>
                            </ul>

                            <ul class="nav">
                                <li>
                                    <a href class="auto">
                                        <i class="fa fa-laptop icon text-success"></i>
                                        <span class="font-bold" translate="aside.nav.Mantenimiento">GESTION DE MONITOREO</span>
                                    </a>
                                    <ul class="nav nav-sub dk">
                                        <li ui-sref-active="active">
                                            <a href="/monitoreo"><span><b>Incubación</b></span></a>
                                        </li>
                                    </ul>
                                </li>
                            </ul>

                            <ul class="nav">
                                <li>
                                    <a href class="auto">
                                        <i class="fa fa-laptop icon text-success"></i>
                                        <span class="font-bold" translate="aside.nav.Mantenimiento">GESTION DE REPORTES</span>
                                    </a>
                                    <ul class="nav nav-sub dk">
                                        <li ui-sref-active="active">
                                            <a href="/reporte/replegal"><span><b>Reporte Rep Legal</b></span></a>
                                        </li>
                                        <li ui-sref-active="active">
                                            <a href="/reporte/pedido"><span><b>Reporte pedidos</b></span></a>
                                        </li>
                                        <li ui-sref-active="active">
                                            <a href="/reporte/incubacion"><span><b>Reporte incubación</b></span></a>
                                        </li>
                                        <li ui-sref-active="active">
                                            <a href="/reporte/temphumedad"><span><b>Reporte temperatura y humedad por módulo</b></span></a>
                                        </li>
                                        <li ui-sref-active="active">
                                            <a href="/reporte/sensores"><span><b>Reporte Sensores</b></span></a>
                                        </li>
                                        <li ui-sref-active="active">
                                            <a href="/reporte/incidencia"><span><b>Reporte incidencias</b></span></a>
                                        </li>
                                    </ul>
                                </li>
                            </ul>

                            <ul class="nav">
                                <li>
                                    <a href="#" class="auto">
                                        <span class="font-bold" translate="aside.nav.Mantenimiento"></span>
                                    </a>
                                </li>
                            </ul>

                        </nav>
                    </div>
                </div>
            </div>
        `
        break;

    case "Administrador":
        modulo = "Administrador"
        output.innerHTML += `
            <div class="app-header navbar">
                <div class="navbar-header bg-dark">
                    <button class="pull-right visible-xs dk" data-toggle="class:show" data-target=".navbar-collapse"
                        style="color:#ecf0f1;">
                        <i class="glyphicon glyphicon-cog"></i>
                    </button>
                    <button class="pull-right visible-xs" data-toggle="class:off-screen" data-target=".app-aside"
                        ui-scroll="app" style="color:#ecf0f1;">
                        <i class="glyphicon glyphicon-align-justify"></i>
                    </button>
                    <a href="#" class="navbar-brand text-lt">
                        <i class="fa fa-list icon text-success"></i>
                        <span class="hidden-folded m-l-xs">Incubadora</span>
                    </a>
                </div>
                <div class="collapse pos-rlt navbar-menu-wrapper navbar-collapse box-shadow bg-white-only">
                    <div class="nav navbar-nav hidden-xs">
                        <a href="#" class="btn no-shadow navbar-btn active" data-toggle="class:app-aside-folded" data-target=".app">
                            <i class="fa fa-dedent fa-fw text"></i>
                            <i class="fa fa-indent fa-fw text-active"></i>
                        </a>
                    </div>
                    <ul class="nav navbar-nav navbar-right">
                        <li class="dropdown">
                            <a href="#" data-toggle="dropdown" class="dropdown-toggle clear" data-toggle="dropdown">
                                <span class="thumb-sm avatar pull-right m-t-n-sm m-b-n-sm m-l-sm">
                                    <img src="/../img/admin.png" alt="">
                                    <i class="on md b-white bottom"></i>
                                </span>
                                <span class="hidden-sm hidden-md">
                                    <strong>${modulo}</strong>  <label></label></span>
                                </span> <b class="caret"></b>
                            </a>

                            <ul class="dropdown-menu animated fadeInRight w hidden-folded" style="width:250px">
                                <li class="wrapper b-b m-b-sm bg-light m-t-n-xs">
                                    <div>
                                        <p>Bienvenido</p>
                                    </div>
                                    <progressbar value="60" class="progress-xs m-b-none bg-white"></progressbar>
                                </li>
                                <li>
                                    <a href="/perfil">
                                        <span class="badge bg-danger pull-right">C</span>
                                        <span>Perfil</span>
                                    </a>
                                </li>
                                <li class="divider"></li>
                                <li>
                                    <a href="/perfil/configuration">
                                        <span class="badge bg-danger pull-right">C</span>
                                        <span>Configuracion de Cuenta</span>
                                    </a>
                                </li>
                                <li class="divider"></li>
                                <li>
                                    <a href="/login/logout">Salir</a>
                                </li>
                            </ul>

                        </li>
                    </ul>
                </div>
            </div>

            <div class="app-aside hidden-xs bg-dark">
                <div class="aside-wrap">
                    <div class="navi-wrap">
                        <nav ui-nav class="navi">

                            <ul class="nav">
                                <li class="hidden-folded padder m-t m-b-sm text-muted text-xs">
                                    <span translate="aside.nav.HEADER">PANEL ADMINISTRATIVO</span>
                                </li>
                                <li>
                                    <a href class="auto">
                                        <i class="fa fa-laptop icon text-success"></i>
                                        <span class="font-bold" translate="aside.nav.Mantenimiento">GESTION DE REGISTROS</span>
                                    </a>
                                    <ul class="nav nav-sub dk">
                                        <li>
                                            <a href class="auto">
                                                <i class="icon-bookmarks"></i>
                                                <span class="font-bold" translate="aside.nav.Mantenimiento">Usuario</span>
                                            </a>
                                            <ul class="nav nav-sub dk" style="display: none;">
                                                <li ui-sref-active="active">
                                                    <a href="/usuario" target='_self'><span class="margen"> Personal</span></a>
                                                </li>
                                                <li ui-sref-active="active">
                                                    <a href="/usuario/representante" target='_self'><span class="margen"> Representante Legal</span></a>
                                                </li>
                                            </ul>
                                        </li>
                                    </ul>
                                    <ul class="nav nav-sub dk">
                                        <li>
                                            <a href class="auto">
                                                <i class="icon-bookmarks"></i>
                                                <span class="font-bold" translate="aside.nav.Mantenimiento">Empresa</span>
                                            </a>
                                            <ul class="nav nav-sub dk" style="display: none;">
                                                <li ui-sref-active="active">
                                                    <a href="/empresa"><span class="margen"> Nueva Empresa</span></a>
                                                </li>
                                            </ul>
                                        </li>
                                    </ul>
                                    <ul class="nav nav-sub dk">
                                        <li>
                                            <a href class="auto">
                                                <i class="icon-bookmarks"></i>
                                                <span class="font-bold" translate="aside.nav.Mantenimiento">Cámara</span>
                                            </a>
                                            <ul class="nav nav-sub dk" style="display: none;">
                                                <li ui-sref-active="active">
                                                    <a href="/camara"><span class="margen"> Nueva Cámara</span></a>
                                                </li>
                                            </ul>
                                        </li>
                                    </ul>
                                    <ul class="nav nav-sub dk">
                                        <li>
                                            <a href class="auto">
                                                <i class="icon-bookmarks"></i>
                                                <span class="font-bold" translate="aside.nav.Mantenimiento">Pedidos</span>
                                            </a>
                                            <ul class="nav nav-sub dk" style="display: none;">
                                                <li ui-sref-active="active">
                                                    <a href="/pedido"><span class="margen"> Nuevo Pedido</span></a>
                                                </li>
                                                <li ui-sref-active="active">
                                                    <a href="/incubadora/incubacion"><span class="margen"> Incubación</span></a>
                                                </li>
                                            </ul>
                                        </li>
                                    </ul>                                   
                                    <ul class="nav nav-sub dk">
                                        <li>
                                            <a href class="auto">
                                                <i class="icon-bookmarks"></i>
                                                <span class="font-bold" translate="aside.nav.Mantenimiento">Configuración</span>
                                            </a>
                                            <ul class="nav nav-sub dk" style="display: none;">
                                                <li ui-sref-active="active">
                                                    <a href="/incubadora"><span class="margen"> Incubadora</span></a>
                                                </li>
                                                <ul class="nav nav-sub dk margensub">
                                                    <li>
                                                        <a href class="auto">
                                                            <i class="icon-radio-unchecked"></i>
                                                            <span class="font-bold" translate="aside.nav.Mantenimiento">Sesores</span>
                                                        </a>
                                                        <ul class="nav nav-sub dk" style="display: none;">
                                                            <li ui-sref-active="active">
                                                                <a href="/sensores"><span class="margen"> Nuevo Sensor</span></a>
                                                            </li>
                                                            <li ui-sref-active="active">
                                                                <a href="/sensores/tipoSensor"><span class="margen"> Tipo de Sensor</span></a>
                                                            </li>
                                                        </ul>
                                                    </li>
                                                </ul>

                                            </ul>
                                        </li>
                                    </ul>
                                </li>
                            </ul>

                            <ul class="nav">
                                <li>
                                    <a href class="auto">
                                        <i class="fa fa-laptop icon text-success"></i>
                                        <span class="font-bold" translate="aside.nav.Mantenimiento">GESTION DE MONITOREO</span>
                                    </a>
                                    <ul class="nav nav-sub dk">
                                        <li ui-sref-active="active">
                                            <a href="/monitoreo"><span><b>Incubación</b></span></a>
                                        </li>
                                    </ul>
                                </li>
                            </ul>

                            <ul class="nav">
                                <li>
                                    <a href class="auto">
                                        <i class="fa fa-laptop icon text-success"></i>
                                        <span class="font-bold" translate="aside.nav.Mantenimiento">GESTION DE REPORTES</span>
                                    </a>
                                    <ul class="nav nav-sub dk">
                                        <li ui-sref-active="active">
                                            <a href="/reporte/replegal"><span><b>Reporte Rep Legal</b></span></a>
                                        </li>
                                        <li ui-sref-active="active">
                                            <a href="/reporte/pedido"><span><b>Reporte pedidos</b></span></a>
                                        </li>
                                        <li ui-sref-active="active">
                                            <a href="/reporte/incubacion"><span><b>Reporte incubación</b></span></a>
                                        </li>
                                        <li ui-sref-active="active">
                                            <a href="/reporte/temphumedad"><span><b>Reporte temperatura y humedad por módulo</b></span></a>
                                        </li>
                                        <li ui-sref-active="active">
                                            <a href="/reporte/sensores"><span><b>Reporte Sensores</b></span></a>
                                        </li>
                                        <li ui-sref-active="active">
                                            <a href="/reporte/incidencia"><span><b>Reporte incidencias</b></span></a>
                                        </li>
                                    </ul>
                                </li>
                            </ul>

                        </nav>
                    </div>
                </div>
            </div>
        `
        break;

    case "Representante_Legal":
        modulo = "Representante Legal"
        output.innerHTML += `
            <div class="app-header navbar">
                <div class="navbar-header bg-dark">
                    <button class="pull-right visible-xs dk" data-toggle="class:show" data-target=".navbar-collapse"
                        style="color:#ecf0f1;">
                        <i class="glyphicon glyphicon-cog"></i>
                    </button>
                    <button class="pull-right visible-xs" data-toggle="class:off-screen" data-target=".app-aside"
                        ui-scroll="app" style="color:#ecf0f1;">
                        <i class="glyphicon glyphicon-align-justify"></i>
                    </button>
                    <a href="#" class="navbar-brand text-lt">
                        <i class="fa fa-list icon text-success"></i>
                        <span class="hidden-folded m-l-xs">Incubadora</span>
                    </a>
                </div>
                <div class="collapse pos-rlt navbar-menu-wrapper navbar-collapse box-shadow bg-white-only">
                    <div class="nav navbar-nav hidden-xs">
                        <a href="#" class="btn no-shadow navbar-btn active" data-toggle="class:app-aside-folded" data-target=".app">
                            <i class="fa fa-dedent fa-fw text"></i>
                            <i class="fa fa-indent fa-fw text-active"></i>
                        </a>
                    </div>
                    <ul class="nav navbar-nav navbar-right">
                        <li class="dropdown">
                            <a href="#" data-toggle="dropdown" class="dropdown-toggle clear" data-toggle="dropdown">
                                <span class="thumb-sm avatar pull-right m-t-n-sm m-b-n-sm m-l-sm">
                                    <img src="/../img/admin.png" alt="">
                                    <i class="on md b-white bottom"></i>
                                </span>
                                <span class="hidden-sm hidden-md">
                                    <strong>${modulo}</strong>  <label></label></span>
                                </span> <b class="caret"></b>
                            </a>

                            <ul class="dropdown-menu animated fadeInRight w hidden-folded" style="width:250px">
                                <li class="wrapper b-b m-b-sm bg-light m-t-n-xs">
                                    <div>
                                        <p>Bienvenido</p>
                                    </div>
                                    <progressbar value="60" class="progress-xs m-b-none bg-white"></progressbar>
                                </li>
                                <li>
                                    <a href="/perfil">
                                        <span class="badge bg-danger pull-right">C</span>
                                        <span>Perfil</span>
                                    </a>
                                </li>
                                <li class="divider"></li>
                                <li>
                                    <a href="/perfil/configuration">
                                        <span class="badge bg-danger pull-right">C</span>
                                        <span>Configuracion de Cuenta</span>
                                    </a>
                                </li>
                                <li class="divider"></li>
                                <li>
                                    <a href="/login/logout">Salir</a>
                                </li>
                            </ul>

                        </li>
                    </ul>
                </div>
            </div>

            <div class="app-aside hidden-xs bg-dark">
                <div class="aside-wrap">
                    <div class="navi-wrap">
                        <nav ui-nav class="navi">
                            <ul class="nav">
                                <li>
                                    <a href class="auto">
                                        <i class="fa fa-laptop icon text-success"></i>
                                        <span class="font-bold" translate="aside.nav.Mantenimiento">GESTION DE MONITOREO</span>
                                    </a>
                                    <ul class="nav nav-sub dk">
                                        <li ui-sref-active="active">
                                            <a href="/monitoreo"><span><b>Incubación</b></span></a>
                                        </li>
                                    </ul>
                                </li>
                            </ul>

                            <ul class="nav">
                                <li>
                                    <a href class="auto">
                                        <i class="fa fa-laptop icon text-success"></i>
                                        <span class="font-bold" translate="aside.nav.Mantenimiento">GESTION DE REPORTES</span>
                                    </a>
                                    <ul class="nav nav-sub dk">
                                        <li ui-sref-active="active">
                                            <a href="/reporte/replegal"><span><b>Reporte Rep Legal</b></span></a>
                                        </li>
                                        <li ui-sref-active="active">
                                            <a href="/reporte/pedido"><span><b>Reporte pedidos</b></span></a>
                                        </li>
                                        <li ui-sref-active="active">
                                            <a href="/reporte/incubacion"><span><b>Reporte incubación</b></span></a>
                                        </li>
                                        <li ui-sref-active="active">
                                            <a href="/reporte/temphumedad"><span><b>Reporte temperatura y humedad por módulo</b></span></a>
                                        </li>
                                        <li ui-sref-active="active">
                                            <a href="/reporte/sensores"><span><b>Reporte Sensores</b></span></a>
                                        </li>
                                        <li ui-sref-active="active">
                                            <a href="/reporte/incidencia"><span><b>Reporte incidencias</b></span></a>
                                        </li>
                                    </ul>
                                </li>
                            </ul>

                        </nav>
                    </div>
                </div>
            </div>
        `
        break;

    default:
        var control = document.querySelector('.control');
        var btn = document.querySelector('.navbar-btn');

        if (!control.classList.contains('app-aside-folded')) {
            control.classList.add('app-aside-folded');
        }

        output.innerHTML += `
            <div class="app-header navbar">
                <div class="navbar-header bg-dark">
                    <a href="#" class="navbar-brand text-lt">
                        <i class="fa fa-list icon text-success"></i>
                        <span class="hidden-folded m-l-xs">Incubadora</span>
                    </a>
                </div>
                <div class="collapse pos-rlt navbar-menu-wrapper navbar-collapse box-shadow bg-white-only">
                    <div class="nav navbar-nav hidden-xs oculto">
                        <span class="m-l-xs">Incubadora</span>
                    </div>
                </div>
            </div>

            <div class="app-aside hidden-xs bg-dark">
                <div class="aside-wrap">
                    <div class="navi-wrap">
                        <nav ui-nav class="navi">
                        </nav>
                    </div>
                </div>
            </div>
        `
        break;
}