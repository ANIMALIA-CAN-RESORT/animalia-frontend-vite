<template>
  <footer class="footer bg-light">
    <!-- si quiero ponerlo fijo le añadiré fixed-bottom mb-2 -->
    <div class="text-center">
      <div class="row justify-content-around d-inline-block">
        <span>
          <a
            class="btn btn-link"
            href="https://git.institutomilitar.com/joseluispuentes82"
            aria-hidden="true"
            target="_blank"
          >
            <v-icon name="fa-gitlab" scale="10" class="gitlab" />
          </a>
        </span>
        <span>
          <a
            class="btn btn-link"
            href="https://github.com/joseluispuentes82"
            aria-hidden="true"
            target="_blank"
          >
            <v-icon name="fa-github" scale="10" class="github" />
          </a>
        </span>
        <span>
          <a
            class="btn btn-link"
            href="https://twitter.com/tweeter?lang=es"
            rel="noopener"
            target="_blank"
          >
            <v-icon name="fa-twitter" scale="10" class="twitter" />
          </a>
        </span>
        <span>
          <a class="btn btn-link" href="https://wa.me/34669899668" rel="noopener" target="_blank">
            <v-icon name="fa-whatsapp" scale="10" class="whatsapp" />
          </a>
        </span>
        <span>
          <a
            class="btn btn-link"
            href="https://t.me/joseluispuentes"
            aria-hidden="true"
            target="_blank"
          >
            <v-icon name="fa-telegram-plane" scale="10" class="telegram" />
          </a>
        </span>
        <span>
          <a
            class="btn btn-link"
            href="https://www.instagram.com/joseluispuentes"
            aria-hidden="true"
            target="_blank"
          >
            <v-icon name="fa-instagram" scale="10" class="instagram" />
          </a>
        </span>
        <span>
          <a
            class="btn btn-link"
            href="https://www.facebook.com/joseluispuentes/"
            aria-hidden="true"
            target="_blank"
          >
            <v-icon name="fa-facebook" scale="10" class="facebook" />
          </a>
        </span>
      </div>
    </div>
    <hr />
    <div>
      <RouterLink :to="{ name: 'about' }">
        <p class="text-center bg-light py-3 text-secondary mb-0">&#9400; 2025 - Dpto SIC - ACING</p>
      </RouterLink>
    </div>
  </footer>
</template>

<style lang="scss">
footer a.btn,
footer a.btn:hover {
  color: black;
}

a.btn-link {
  font-size: 1.6rem;
}

.btn-link .twitter:hover {
  color: #009deb;
}

.btn-link .gitlab:hover {
  color: #e24329;
}

.btn-link .whatsapp:hover {
  color: #1ada4a;
}

.btn-link .facebook:hover {
  color: #2f1be2;
}

.btn-link .github:hover {
  color: #4d4c52;
}

.btn-link .instagram:hover {
  color: #c13584;
}

.btn-link .telegram:hover {
  color: #0088cc;
}

hr {
  border-color: #ee0cd0;
}
</style>
