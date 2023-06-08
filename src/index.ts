import './styles/index.css';
// import './world/example';
import { createApp } from 'vue';
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import App from './views/App.vue';

const app = createApp(App);

app.use(Antd);

app.mount('body');
