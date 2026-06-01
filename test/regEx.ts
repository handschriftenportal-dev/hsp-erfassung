export const regEx = Object.freeze({
  isUuid:
    /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/,
  isNormId:
    /^NORM-[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/,
  startsCapitalized: /^[A-ZÜÄÖ].*/,
  seemsToBeTranslationKey: /^([a-z]+\.)+[a-z]+$/,
  isUnicodeKey: /^U\+[0-9A-F]{4,6}$/,
  nonEmptyString: /^(?!\s*$).+/,
  isUrl: /^https?:\/\/[^\s/$.?#].[^\s]*$/,
})
