const getters = {
    offPayment:state=>state.app.offPayment,
    encryptedData: state => state.app.encryptedData,
    appPin: state => state.app.appPin,
    mnemonic: state => state.user.mnemonic,
    newPin: state => state.user.newPin

}
export default getters
