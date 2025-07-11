<template>
  <div>
    <h1>{{ $t('comun.notFound') }}</h1>
    <h2>
      {{ $t('comun.error404') }}
      <img src="/img/logo_polla_con_alas.png" alt="Polla con alas" width="5%" />
    </h2>
    <h3>{{ $t('comun.grimososAlert') }}</h3>
    <img class="rounded mx-auto d-block" src="/img/Escudo_Acing.jpeg" alt="Page not-found" />
    <br />
    <div class="btn-group btn-block col-12">
      <button
        type="button"
        class="btn btn-danger col-10 col-sm-10 col-md-3 col-lg-3 col-xl-3"
        data-bs-toggle="modal"
        data-bs-target="#modal-1"
      >
        {{ $t('comun.grimoso') }}
      </button>
      <button
        type="button"
        class="btn btn-warning col-10 col-sm-10 col-md-3 col-lg-3 col-xl-3"
        data-bs-toggle="modal"
        data-bs-target="#modal-2"
      >
        {{ $t('comun.muyGrimoso') }}
      </button>
      <button
        type="button"
        class="btn btn-info col-10 col-sm-10 col-md-3 col-lg-3 col-xl-3"
        data-bs-toggle="modal"
        data-bs-target="#modal-3"
      >
        {{ $t('comun.vomitivo') }}
      </button>
      <button
        type="button"
        class="btn btn-dark col-10 col-sm-10 col-md-3 col-lg-3 col-xl-3"
        data-bs-toggle="modal"
        data-bs-target="#modal-4"
      >
        {{ $t('comun.odioso') }}
      </button>
    </div>
  </div>
  <!-- Modal 1-->
  <div class="modal fade" id="modal-1" tabindex="-1" aria-labelledby="modal-1" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="modal-1-Label">{{ $t('comun.grimoso') }}</h1>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <img
            src="/img/iglesias.jpg"
            alt="grimoso"
            title="grimoso"
            id="imagen-modal"
            class="img-fluid"
          />
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-dark" data-bs-dismiss="modal">
            {{ $t('comun.cerrar') }}
          </button>
        </div>
      </div>
    </div>
  </div>
  <!-- Modal 2-->
  <div class="modal fade" id="modal-2" tabindex="-1" aria-labelledby="modal-2" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="modal-2-Label">{{ $t('comun.muyGrimoso') }}</h1>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <img
            src="/img/echenique.jpeg"
            alt="grimoso"
            title="muy grimoso"
            id="imagen-modal"
            class="img-fluid"
          />
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-dark" data-bs-dismiss="modal">
            {{ $t('comun.cerrar') }}
          </button>
        </div>
      </div>
    </div>
  </div>
  <!-- Modal 3-->
  <div class="modal fade" id="modal-3" tabindex="-1" aria-labelledby="modal-3" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="modal-3-Label">{{ $t('comun.vomitivo') }}</h1>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <img
            src="/img/puigdemont.jpg"
            alt="grimoso"
            title="muy grimoso"
            id="imagen-modal"
            class="img-fluid"
          />
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-dark" data-bs-dismiss="modal">
            {{ $t('comun.cerrar') }}
          </button>
        </div>
      </div>
    </div>
  </div>
  <!-- Modal 4-->
  <div class="modal fade" id="modal-4" tabindex="-1" aria-labelledby="modal-4" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="modal-4-Label">{{ $t('comun.odioso') }}</h1>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <img
            src="/img/sanchez.jpg"
            alt="grimoso"
            title="muy grimoso"
            id="imagen-modal"
            class="img-fluid"
          />
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-dark" data-bs-dismiss="modal">
            {{ $t('comun.cerrar') }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
div {
  color: green;
}
h1 {
  color: rgb(0, 225, 255);
}
h2 {
  color: red;
}
.btn {
  color: white;
  font-weight: bold;
}
</style>
