/* recoil state for the base prompt
* in the playground,
* if state exists, start local state with the base prompt
* else set local state default value
 */

import { atom } from 'recoil';

export const basePromptState = atom<any>({
    key: 'basePromptState',
    default: null,
});

