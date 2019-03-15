// is-equal helper is necessary to determine which option is currently selected.
import { helper as buildHelper } from '@ember/component/helper';

export function emberNotificationIsEqual(params) {
    return params[0] === params[1];
}

export default buildHelper(emberNotificationIsEqual);
