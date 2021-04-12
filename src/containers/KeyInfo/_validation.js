export const ValidateMnemonicSaved = (saved) => {
    if (!saved) {
        return new Error('Mnemonic not saved');
    }
    return new Error('');
};
