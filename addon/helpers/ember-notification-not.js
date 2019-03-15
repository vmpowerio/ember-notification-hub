// is-equal helper is necessary to determine which option is currently selected.
import { helper as buildHelper } from '@ember/component/helper';

export function emberNotificationNot(params) {
    return !params[0];
}

export default buildHelper(emberNotificationNot);
