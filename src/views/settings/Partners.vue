<template>
  <div class="con-page">

    <div>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/settings'}" class="breadcrump">Настройки</el-breadcrumb-item>
        <el-breadcrumb-item class="breadcrump">Партнеры</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div
      class="simple-content"
    >
      <router-link
        class="card-div"
        tag="div"
        :to="{ name: 'Tour Agencies'}"
      >
        <div class="card-div-head">
          <div class="num-text">
            <h1>{{tourAgencies.length}}</h1>
            <h4>Всего партнеров</h4>
          </div>
          <div class="vert-divider"/>
          <div class="num-text">
            <h1>{{setActiveTourAgencies.length}}</h1>
            <h4>Активные</h4>
          </div>
        </div>
        <div class="card-body">
          <h3>Туристические агентства</h3>
        </div>
      </router-link>

      <router-link
        class="card-div"
        tag="div"
        :to="{ name: 'Partner Companies'}"
      >
        <div class="card-div-head">
          <div class="num-text">
            <h1>{{companies.length}}</h1>
            <h4>Всего партнеров</h4>
          </div>
          <div class="vert-divider"/>
          <div class="num-text">
            <h1>{{setActiveCompanies.length}}</h1>
            <h4>Активные</h4>
          </div>
        </div>
        <div class="card-body">
          <h3>Компании - партнёры</h3>
        </div>
      </router-link>

      <router-link
        class="card-div"
        tag="div"
        :to="{ name: 'Agents'}"
      >
        <div class="card-div-head">
          <div class="num-text">
            <h1>{{agents.length}}</h1>
            <h4>Всего партнеров</h4>
          </div>
          <div class="vert-divider"/>
          <div class="num-text">
            <h1>{{setActiveAgents.length}}</h1>
            <h4>Активные</h4>
          </div>
        </div>
        <div class="card-body">
          <h3>Агенты</h3>
        </div>
      </router-link>
    </div>

  </div>
</template>

<script>
export default {
  name: 'Partners',

  data:() => ({
    agents: JSON.parse(window.sessionStorage.partners).agents,
    companies: JSON.parse(window.sessionStorage.partners).companyPartners,
    tourAgencies: JSON.parse(window.sessionStorage.partners).travelPartners
  }),

  computed: {
    setActiveTourAgencies() {
      const actives = []
      const amount = this.tourAgencies.length
      const current = new Date()
      

      for(let i=0; i<amount; i++) {
        if(new Date(JSON.stringify(this.tourAgencies[i].contract[0].startedDate)[1]+JSON.stringify(this.tourAgencies[i].contract[0].startedDate)[2]+
        JSON.stringify(this.tourAgencies[i].contract[0].startedDate)[3]+JSON.stringify(this.tourAgencies[i].contract[0].startedDate)[4]+'/'+
        JSON.stringify(this.tourAgencies[i].contract[0].startedDate)[6]+JSON.stringify(this.tourAgencies[i].contract[0].startedDate)[7]+'/'+
        JSON.stringify(this.tourAgencies[i].contract[0].startedDate)[9]+JSON.stringify(this.tourAgencies[i].contract[0].startedDate)[10]) < current
        && current < 
        new Date(JSON.stringify(this.tourAgencies[i].contract[0].finishedDate)[1]+JSON.stringify(this.tourAgencies[i].contract[0].finishedDate)[2]+
        JSON.stringify(this.tourAgencies[i].contract[0].finishedDate)[3]+JSON.stringify(this.tourAgencies[i].contract[0].finishedDate)[4]+'/'+
        JSON.stringify(this.tourAgencies[i].contract[0].finishedDate)[6]+JSON.stringify(this.tourAgencies[i].contract[0].finishedDate)[7]+'/'+
        JSON.stringify(this.tourAgencies[i].contract[0].finishedDate)[9]+JSON.stringify(this.tourAgencies[i].contract[0].finishedDate)[10])) {
          actives.push('active')
        } else actives.push('notAcitve')
      }
      return actives.filter(obj => obj === 'active')
    },

    setActiveCompanies() {
      const actives = []
      const amount = this.companies.length
      const current = new Date()
      

      for(let i=0; i<amount; i++) {
        if(new Date(JSON.stringify(this.companies[i].contract[0].startedDate)[1]+JSON.stringify(this.companies[i].contract[0].startedDate)[2]+
        JSON.stringify(this.companies[i].contract[0].startedDate)[3]+JSON.stringify(this.companies[i].contract[0].startedDate)[4]+'/'+
        JSON.stringify(this.companies[i].contract[0].startedDate)[6]+JSON.stringify(this.companies[i].contract[0].startedDate)[7]+'/'+
        JSON.stringify(this.companies[i].contract[0].startedDate)[9]+JSON.stringify(this.companies[i].contract[0].startedDate)[10]) < current
        && current < 
        new Date(JSON.stringify(this.companies[i].contract[0].finishedDate)[1]+JSON.stringify(this.companies[i].contract[0].finishedDate)[2]+
        JSON.stringify(this.companies[i].contract[0].finishedDate)[3]+JSON.stringify(this.companies[i].contract[0].finishedDate)[4]+'/'+
        JSON.stringify(this.companies[i].contract[0].finishedDate)[6]+JSON.stringify(this.companies[i].contract[0].finishedDate)[7]+'/'+
        JSON.stringify(this.companies[i].contract[0].finishedDate)[9]+JSON.stringify(this.companies[i].contract[0].finishedDate)[10])) {
          actives.push('active')
        } else actives.push('notAcitve')
      }
      return actives.filter(obj => obj === 'active')
    },

    setActiveAgents() {
      const actives = []
      const amount = this.agents.length
      const current = new Date()
      

      for(let i=0; i<amount; i++) {
        if(new Date(JSON.stringify(this.agents[i].contract[0].startedDate)[1]+JSON.stringify(this.agents[i].contract[0].startedDate)[2]+
        JSON.stringify(this.agents[i].contract[0].startedDate)[3]+JSON.stringify(this.agents[i].contract[0].startedDate)[4]+'/'+
        JSON.stringify(this.agents[i].contract[0].startedDate)[6]+JSON.stringify(this.agents[i].contract[0].startedDate)[7]+'/'+
        JSON.stringify(this.agents[i].contract[0].startedDate)[9]+JSON.stringify(this.agents[i].contract[0].startedDate)[10]) < current
        && current < 
        new Date(JSON.stringify(this.agents[i].contract[0].finishedDate)[1]+JSON.stringify(this.agents[i].contract[0].finishedDate)[2]+
        JSON.stringify(this.agents[i].contract[0].finishedDate)[3]+JSON.stringify(this.agents[i].contract[0].finishedDate)[4]+'/'+
        JSON.stringify(this.agents[i].contract[0].finishedDate)[6]+JSON.stringify(this.agents[i].contract[0].finishedDate)[7]+'/'+
        JSON.stringify(this.agents[i].contract[0].finishedDate)[9]+JSON.stringify(this.agents[i].contract[0].finishedDate)[10])) {
          actives.push('active')
        } else actives.push('notAcitve')
      }
      return actives.filter(obj => obj === 'active')
    },
  },

  methods: {
    
  }
}
</script>

<style>

</style>