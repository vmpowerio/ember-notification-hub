import { helper as buildHelper } from '@ember/component/helper';

export function emberNotificationAnd(params) {
    return params[0] && params[1];
}

export default buildHelper(emberNotificationAnd);
