<template>
  <ion-header>
    <ion-toolbar>
      <ion-buttons slot="start">
        <ion-button @click="closeModal">
          <ion-icon slot="icon-only" :icon="closeOutline" />
        </ion-button>
      </ion-buttons>
      <ion-title>{{ translate("History") }}</ion-title>
    </ion-toolbar>
  </ion-header>
  <ion-content>
    <ion-list v-for="(item, index) in items" :key="index">
      <ion-item>
        <ion-thumbnail slot="start">
          <ShopifyImg :src="getProduct(item.productId).mainImageUrl" />
        </ion-thumbnail>
        <ion-label>
          {{ item.receiversFullName }}
          <p>{{ translate("Shipment ID") }}: {{ item.shipmentId }}</p>
        </ion-label>
        <ion-label>
          <ion-note>{{ item.quantityAccepted }} {{ translate("received") }} | {{ item.quantityRejected }} {{ translate("rejected") }}</ion-note>
          <ion-note>{{ item.datetimeReceived ? getTime(item.datetimeReceived) : "-" }}</ion-note>
        </ion-label>
      </ion-item>
    </ion-list>

    <!-- Empty state -->
    <div class="empty-state" v-if="!items.length">
      <img src="../assets/images/empty-state-history-modal.png" alt="empty state">
      <p v-html="emptyStateMessage"></p>
    </div>
  </ion-content>
</template>

<script>
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonNote,
  IonThumbnail,
  IonTitle,
  IonToolbar,
  modalController,
} from '@ionic/vue';
import { defineComponent } from 'vue';
import { closeOutline } from 'ionicons/icons';
import { ShopifyImg, translate } from '@hotwax/dxp-components';
import { mapGetters, useStore } from "vuex";
import { DateTime } from 'luxon';

export default defineComponent({
  name: "ReceivingHistoryModal",
  components: {
    ShopifyImg,
    IonButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonIcon,
    IonItem,
    IonLabel,
    IonList,
    IonNote,
    IonThumbnail,
    IonTitle,
    IonToolbar,
  },
  data() {
    return {
      items: [],
      emptyStateMessage: translate("No shipments have been received against this purchase order yet", {lineBreak: '<br />'})
    }
  },
  props: ["productId"],
  mounted() {
    this.items = this.productId ? this.poHistory.items.filter(item => item.productId === this.productId) : this.poHistory.items;
  },
  computed: {
    ...mapGetters({
      poHistory: 'order/getPOHistory',
      getProduct: 'product/getProduct'
    })
  },
  methods: {
    closeModal() {
      modalController.dismiss({ dismissed: true });
    },
    getTime(time) {
      return DateTime.fromMillis(time).toFormat("H:mm a dd/MM/yyyy")
    }
  },
  setup() {
    const store = useStore();

    return {
      closeOutline,
      store,
      translate
    };
  },
});
</script>

<style scoped>
ion-note {
  display: block;
  text-align: end;
}
</style>