<script setup lang="ts">
import { isMobile } from "is-mobile";
import { useI18n } from "vue-i18n";
import { ref, computed, watchEffect } from "vue"; // 确保导入了需要的 Vue 函数

const { t } = useI18n();

const props = defineProps({
  sendMessage: {
    type: Function,
    required: true,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  loading: {
    type: Boolean,
    default: false,
  },
});

const message = ref("");
const rows = ref(1);
const autoGrow = ref(true);

const hint = computed(() => {
  return isMobile()
    ? ""
    : t("pressEnterToSendYourMessageOrShiftEnterToAddANewLine");
});

watchEffect(() => {
  const lines = message.value.split(/\r\n|\r|\n/).length;
  if (lines > 8) {
    rows.value = 8;
    autoGrow.value = false;
  } else {
    rows.value = 1;
    autoGrow.value = true;
  }
});

const send = () => {
  let msg = message.value;
  // remove the last "\n"
  if (msg[msg.length - 1] === "\n") {
    msg = msg.slice(0, -1);
  }
  if (msg.length > 0) {
    let item = toolSelector.value.list[toolSelector.value.selected];
    props.sendMessage({
      type: "text",  // item.type
      text: msg,
      tool: item.name,  // TODO：这啥？要用吗
    });
  }
  message.value = "";
  toolSelector.value.selected = 0;
};

const textArea = ref();

interface DocumentManager {
  loadDocs: () => void;
}
const documentMan = ref<DocumentManager | null>(null);

const usePrompt = (prompt: string) => {
  message.value = prompt;
  textArea.value.focus();
};
const refreshDocList = () => {
  if (documentMan.value) {
    documentMan.value.loadDocs();
  }
};

const clickSendBtn = () => {
  send();
};

const enterOnly = (event: KeyboardEvent) => {
  event.preventDefault();
  if (!isMobile()) {
    send();
  }
};

defineExpose({
  usePrompt,
  refreshDocList,
});

const toolSelector = ref({
  list: [
    { title: "Chat", icon: "mdi-message", name: "chat", type: 0 }, // 修改图标
    { title: "Web Search", icon: "mdi-web", name: "web_search", type: 100 }, // 修改图标
    { title: "ArXiv", icon: "mdi-book-open-variant", name: "arxiv", type: 110 }, // 修改图标
  ],
  selected: 0,
});
function getToolIcon() {
  let v = toolSelector.value;
  let icon = v.list[v.selected].icon;
  return icon;
}
function getLabel() {
  let v = toolSelector.value;
  let name = v.list[v.selected].name;
  return "messageLabel." + name;
}
function selectTool(idx: number) {
  let v = toolSelector.value;
  v.selected = idx;
  let name = v.list[idx].name;
}
const docDialogCtl = ref({
  dialog: false,
});
</script>

<template>
  <div class="flex-grow-1 d-flex align-center justify-space-between">
    <v-btn title="Tools" class="mr-3" id="tools_btn" variant="text">
      <v-icon>{{ getToolIcon() }}</v-icon>
    </v-btn>
    <v-menu activator="#tools_btn" open-on-hover>
      <v-list density="compact">
        <v-list-item
          v-for="(item, index) in toolSelector.list"
          :key="index"
          @click="selectTool(index)"
        >
          <template v-slot:prepend>
            <v-icon>{{ item.icon }}</v-icon>
          </template>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>

        <v-list-item @click="docDialogCtl.dialog = true">
          <template v-slot:prepend>
            <v-icon>mdi-file-document-multiple</v-icon>
          </template>
          <v-list-item-title>Documents</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>

    <v-textarea
      ref="textArea"
      v-model="message"
      :label="$t(getLabel())"
      :placeholder="hint"
      :rows="rows"
      max-rows="8"
      :auto-grow="autoGrow"
      :disabled="disabled"
      :loading="loading"
      :hide-details="true"
      clearable
      variant="outlined"
      class="userinputmsg"
      @keypress.enter.exact="enterOnly"
    ></v-textarea>
    <v-btn
      :disabled="loading"
      title="Send"
      class="ml-3"
      @click="clickSendBtn"
      variant="plain"
    >
      <v-icon size="24">mdi-send</v-icon>
    </v-btn>
  </div>
  <DocumentsManage
    :send-message="sendMessage"
    :control="docDialogCtl"
    ref="documentMan"
  />
</template>
