<template>
  <section class="generic-container container text-center pb-5">
    <h3 class="main-title pb-5 text-secondary">Dúvidas frenquentes</h3>
    <div class="row">
      <div
        data-bs-toggle="collapse"
        data-bs-target="#question1"
        role="button"
        class="question col-12 rounded-1 border-bottom py-3"
      >
        <div class="d-flex justify-content-between">
          <span>O cadastro de currículos é gratuito?</span>
          <FontAwesomeIcon :icon="faChevronDown"/>
        </div>
        <div id="question1" class="collapse">
          Sim. Vocâ não paga nada pelo cadastro do currículo. Você deve se inscrever nas vagas de seu interesse para que as empresas possam visualizar seu currículo.
        </div>
      </div>
      <div
        data-bs-toggle="collapse"
        data-bs-target="#question2"
        role="button"
        class="question col-12 rounded-1 border-bottom py-3"
      >
        <div class="d-flex justify-content-between">
          <span>A inscrição nas vagas é gratuita?</span>
          <FontAwesomeIcon :icon="faChevronDown"/>
        </div>
        <div id="question2" class="collapse">
          Sim. Você pode se inscrever em uma vaga por dia sem pagar nada.
        </div>
      </div>
      <div
        data-bs-toggle="collapse"
        data-bs-target="#question3"
        role="button"
        class="question col-12 rounded-1 border-bottom py-3"
      >
        <div class="d-flex justify-content-between">
          <span>Quero ser avisado sobre novas vagas de meu interesse, o que preciso fazer?

          </span>
          <FontAwesomeIcon :icon="faChevronDown"/>
        </div>
        <div id="question3" class="collapse">
          Para ser avisado sobre as vagas de sua preferência é necessário assinar o Plano Vip.
        </div>
      </div>
      <div
        data-bs-toggle="collapse"
        data-bs-target="#question4"
        role="button"
        class="question col-12 rounded-1 border-bottom py-3"
      >
        <div class="d-flex justify-content-between">
          <span>O que é Plano Vip e quais os benefícios?</span>
          <FontAwesomeIcon :icon="faChevronDown"/>
        </div>
        <div id="question4" class="collapse">
          O Plano Vip lhe permite ser avisado quando uma vaga de seu interesse for publicada. Você pode se inscrever em quantas vagas desejar, não tem limite.
        </div>
      </div>
      <div
        data-bs-toggle="collapse"
        data-bs-target="#question5"
        role="button"
        class="question col-12 rounded-1 border-bottom py-3"
      >
        <div class="d-flex justify-content-between">
          <span>Posso anunciar vagas gratuitamente?</span>
          <FontAwesomeIcon :icon="faChevronDown"/>
        </div>
        <div id="question5" class="collapse">
          Disponibilizamos 7 dias gratuitos. Neste período você pode anunciar diversas vagas.
        </div>
      </div>
      <div
        data-bs-toggle="collapse"
        data-bs-target="#question6"
        role="button"
        class="question col-12 rounded-1 border-bottom py-3"
      >
        <div class="d-flex justify-content-between">
          <span>Os currículos são enviados por email?</span>
          <FontAwesomeIcon :icon="faChevronDown"/>
        </div>
        <div id="question6" class="collapse">
          Não. Os currículos são disponibilizado em nosso Funil Inteligente de Seleção onde 
          já separamos os currículos que possui alguma compatibillidade e os que são incompatíveis.
          Em poucos minutos já é possível selecionar os candidatos para Análise ou Entrevista.
        </div>
      </div>
      <div
        data-bs-toggle="collapse"
        data-bs-target="#question7"
        role="button"
        class="question col-12 rounded-1 border-bottom py-3"
      >
        <div class="d-flex justify-content-between">
          <span>Como fico sabendo se meu currículo foi selecionado?</span>
          <FontAwesomeIcon :icon="faChevronDown"/>
        </div>
        <div id="question7" class="collapse">
          A empresa que divulgou a vaga entrará em contato. O contato pode ocorrer por SMS, Email, Whatsapp ou Telefone.
        </div>
      </div>
      <div
        data-bs-toggle="collapse"
        data-bs-target="#question8"
        role="button"
        class="question col-12 rounded-1 border-bottom py-3"
      >
        <div class="d-flex justify-content-between">
          <span>Preciso cadastrar meu curriculo toda vez que preciso me inscrever numa vaga?</span>
          <FontAwesomeIcon :icon="faChevronDown"/>
        </div>
        <div id="question8" class="collapse">
          Não. Basta se inscrever.
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
</script>

<style lang="scss" scoped>
.question {
  text-align: left;

  span {
    color: #e75d25;
  }

  div.collapse {
    padding: 20px 25px;
  }
}
</style>