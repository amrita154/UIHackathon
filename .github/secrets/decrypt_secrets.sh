#!/bin/sh

gpg --quiet --batch --yes --decrypt --passphrase="sample" --output ./.github/secrets/profile.mobileprovision ./.github/secrets/profile.mobileprovision.gpg
gpg --quiet --batch --yes --decrypt --passphrase="sample" --output ./.github/secrets/Certificates.p12 ./.github/secrets/Certificates.p12.gpg

mkdir -p ~/Library/MobileDevice/Provisioning\ Profiles

cp ./.github/secrets/profile.mobileprovision ~/Library/MobileDevice/Provisioning\ Profiles/b5bff837-9543-41fe-bd8a-de1255e11198.mobileprovision


security create-keychain -p "" ios-build.keychain
security import ./.github/secrets/Certificates.p12 -t agg -k ~/Library/Keychains/ios-build.keychain -P "" -A

security list-keychains -s ~/Library/Keychains/ios-build.keychain
security default-keychain -s ~/Library/Keychains/ios-build.keychain
security unlock-keychain -p "" ~/Library/Keychains/ios-build.keychain

security set-key-partition-list -S apple-tool:,apple: -s -k "" ~/Library/Keychains/ios-build.keychain
