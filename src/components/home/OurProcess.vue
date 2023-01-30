<template>
  <section class="generic-container text-center">
    <h3 class="main-title pb-5 text-secondary">Conheça o nosso processo</h3>

    <section id="processo">
      <div>
        <div class="processo-lista">
          <div class="processo processo--1">
            <div class="processo-conteudo wow animate__animated fadeIn animate__delay-1s">
              <img src="../../assets/images/01-imagem.png" alt="">
              <div>
                <h4 class="titulo--2">
                  Divulgue a vaga
                </h4>
                <p>
                  Faça o cadastro das suas informações e vagas disponíveis de forma simples e rápida.
                </p>
              </div>
            </div>
            <div class="processo-seta wow animate__animated fadeIn animate__delay-1s">
              <img src="../../assets/images/01-seta.png" alt="Etapa 01">
            </div>
          </div>
          <div class="processo processo--2">
            <div class="processo-seta wow animate__animated fadeIn animate__delay-2s">
              <img src="../../assets/images/02-seta.png" alt="">
            </div>
            <div class="processo-conteudo wow animate__animated fadeIn animate__delay-2s">
              <img src="../../assets/images/02-imagem.png" alt="">
              <div>
                <h4 class="titulo--2">
                  Análise de currículos
                </h4>
                <p>
                  Com a lista de candidatos cadastrados na vaga em nosso sistema, relalize a análise dos perfis.
                </p>
              </div>
            </div>
          </div>
          <div class="processo processo--3">
            <div class="processo-conteudo wow animate__animated fadeIn animate__delay-3s">
              <img src="../../assets/images/03-imagem.png" alt="">
              <div>
                <h4 class="titulo--2">
                  Agende entrevistas
                </h4>
                <p>
                  Entre em contato com os candidatos rapidamente para agendar a entrevista através das informações disponíveis.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </section>
</template>
<style lang="scss" scoped>
.processo-lista {
  display: flex;
  margin-top: 50px;
}

.processo-conteudo {
  display: flex;
  align-items: center;

  div {
    margin-left: 20px;
    position: relative;

    p {
      margin-top: 10px;
      z-index: 1;
      position: relative;
    }

    img {
      position: absolute;
      z-index: 0;
      top: -40px;
    }
  }

  img {
    border-radius: 50%;
    box-shadow: -5px 10px 10px rgb(0 0 0 / 10%);
  }
}

.processo-seta {
  display: flex;
  justify-content: flex-end;
}

@media screen and (max-width: 1023px) {
  #processo .titulo {
    margin-bottom: 70px !important;
  }

  .processo-lista {
      flex-direction: column;
  }

  .processo--1 .processo-seta img {transform: rotate(60deg);width: 80px;}

  .processo--1 .processo-seta {
      justify-content: flex-start;
      margin-top: 30px;
  }

  .processo-conteudo img {
      width: 120px;
  }

  .processo-conteudo {
      margin: 0 20px;
  }

  .processo + .processo{
      margin-left: 0;
      margin-top: 20px;
  }

  .processo--2 {
      display: flex;
      flex-direction: column;
  }

  .processo--2 .processo-seta {
      order: 2;
  }

  .processo--2 .processo-seta img {
      width: 80px;
      transform: rotate(120deg);
      margin-top: 40px;
  }
}
</style>