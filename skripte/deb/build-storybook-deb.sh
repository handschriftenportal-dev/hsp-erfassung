#!/bin/bash
set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"
cd "$PROJECT_ROOT"

if [ -n "$CI" ] && [ "$BUILD_TYPE" != "release" ]; then
   echo "Skipping Storybook Debian package build in CI"
   echo "  (BUILD_TYPE=$BUILD_TYPE is not 'release')"
   exit 0
fi

echo "Building Storybook Debian package..."

npm run build-storybook

PACKAGE_NAME=$(npm run --silent artefactid)
VERSION=$(npm run --silent version)
STORYBOOK_PACKAGE_NAME="hsp-erfassung-storybook"

DEB_VERSION=$(echo "$VERSION" | sed 's/-SNAPSHOT/~snapshot/')

echo "Package: $STORYBOOK_PACKAGE_NAME"
echo "Version: $DEB_VERSION"

BUILD_DIR="target/debian-storybook"
rm -rf "$BUILD_DIR"
mkdir -p "$BUILD_DIR/DEBIAN"
mkdir -p "$BUILD_DIR/usr/local/SBB/usr/local/$STORYBOOK_PACKAGE_NAME"
mkdir -p "$BUILD_DIR/etc/apache2/conf-available"

if [ ! -d "storybook-static" ]; then
    echo "Error: storybook-static directory not found!"
    echo "Please run 'npm run build-storybook' first."
    exit 1
fi

echo "Copying storybook-static contents..."
cp -r storybook-static/* "$BUILD_DIR/usr/local/SBB/usr/local/$STORYBOOK_PACKAGE_NAME/"

echo "Adding Apache configuration..."
cp "$SCRIPT_DIR/hsp-erfassung-storybook.conf" "$BUILD_DIR/etc/apache2/conf-available/"

echo "Adding postinst script..."
cp "$SCRIPT_DIR/postinst" "$BUILD_DIR/DEBIAN/"
chmod 755 "$BUILD_DIR/DEBIAN/postinst"

INSTALLED_SIZE=$(du -sk "$BUILD_DIR/usr" | cut -f1)

cat > "$BUILD_DIR/DEBIAN/control" <<EOF
Package: $STORYBOOK_PACKAGE_NAME
Version: $DEB_VERSION
Section: web
Priority: optional
Architecture: all
Installed-Size: $INSTALLED_SIZE
Maintainer: Alexander Jandt <alexander.jandt@sbb.spk-berlin.de>
Description: Storybook documentation for HSP Erfassung
 This package contains the Storybook static documentation
 for the Handschriftenportal Erfassungsmodul.
 .
 Includes Apache configuration in /etc/apache2/conf-available/.
 After installation, run 'systemctl reload apache2' to enable.
Homepage: https://github.com/handschriftenportal-dev/hsp-erfassung
EOF

echo "Created DEBIAN/control:"
cat "$BUILD_DIR/DEBIAN/control"
echo ""

DEB_FILE="target/${STORYBOOK_PACKAGE_NAME}_${DEB_VERSION}_all.deb"
echo "Building package: $DEB_FILE"
dpkg-deb --build "$BUILD_DIR" "$DEB_FILE"

echo ""
echo "Package built successfully!"
echo "Package info:"
dpkg-deb --info "$DEB_FILE"

echo ""
echo "Package contents:"
dpkg-deb --contents "$DEB_FILE" | head -20

if [ $(dpkg-deb --contents "$DEB_FILE" | wc -l) -gt 20 ]; then
    echo "... (and more files)"
fi

echo ""
echo "Done! Package created at: $DEB_FILE"
