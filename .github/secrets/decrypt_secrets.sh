#!/bin/sh

gpg --quiet --batch --yes --decrypt --passphrase="sample" --output ./.github/secrets/profile.mobileprovision ./.github/secrets/profile.mobileprovision.gpg
gpg --quiet --batch --yes --decrypt --passphrase="sample" --output ./.github/secrets/Certificates.p12 ./.github/secrets/Certificates.p12.gpg

mkdir -p ~/Library/MobileDevice/Provisioning\ Profiles

cp ./.github/secrets/profile.mobileprovision ~/Library/MobileDevice/Provisioning\ Profiles/b5bff837-9543-41fe-bd8a-de1255e11198.mobileprovision


security create-keychain -p "sample" build.keychain
security import ./.github/secrets/Certificates.p12 -t agg -k ~/Library/Keychains/build.keychain -P "sample" -A

security list-keychains -s ~/Library/Keychains/build.keychain
security default-keychain -s ~/Library/Keychains/build.keychain
security unlock-keychain -p "sample" ~/Library/Keychains/build.keychain

security set-key-partition-list -S apple-tool:,apple: -s -k "sample" ~/Library/Keychains/build.keychain
