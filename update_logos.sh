#!/bin/bash

# Header Logo Pattern (old)
OLD_HEADER='<!-- Klaviertasten (7 weiße Tasten) - kompakter im Kreis -->
                        <rect x="14" y="22" width="4.8" height="20" rx="0.8" fill="white" stroke="#638a1c" stroke-width="1"/>
                        <rect x="18.8" y="22" width="4.8" height="20" rx="0.8" fill="white" stroke="#638a1c" stroke-width="1"/>
                        <rect x="23.6" y="22" width="4.8" height="20" rx="0.8" fill="white" stroke="#638a1c" stroke-width="1"/>
                        <rect x="28.4" y="22" width="4.8" height="20" rx="0.8" fill="white" stroke="#638a1c" stroke-width="1"/>
                        <rect x="33.2" y="22" width="4.8" height="20" rx="0.8" fill="white" stroke="#638a1c" stroke-width="1"/>
                        <rect x="38" y="22" width="4.8" height="20" rx="0.8" fill="white" stroke="#638a1c" stroke-width="1"/>
                        <rect x="42.8" y="22" width="4.8" height="20" rx="0.8" fill="white" stroke="#638a1c" stroke-width="1"/>

                        <!-- Schwarze Tasten (5 Tasten) -->
                        <rect x="17.2" y="22" width="3" height="12" rx="0.4" fill="#638a1c"/>
                        <rect x="22" y="22" width="3" height="12" rx="0.4" fill="#638a1c"/>
                        <rect x="31.6" y="22" width="3" height="12" rx="0.4" fill="#638a1c"/>
                        <rect x="36.4" y="22" width="3" height="12" rx="0.4" fill="#638a1c"/>
                        <rect x="41.2" y="22" width="3" height="12" rx="0.4" fill="#638a1c"/>

                        <!-- Marimba-Schlägel (locker gekreuzt oben rechts) -->
                        <!-- Schlägel 1 (länger, flacher Winkel) -->
                        <line x1="51" y1="13" x2="34" y2="32" stroke="#638a1c" stroke-width="1.2" stroke-linecap="round"/>
                        <circle cx="52" cy="11.5" r="2.5" fill="#84b824"/>
                        <!-- Schlägel 2 (kürzer, steiler Winkel) -->
                        <line x1="43" y1="17" x2="36" y2="27" stroke="#638a1c" stroke-width="1.2" stroke-linecap="round"/>
                        <circle cx="43.5" cy="16" r="2.5" fill="#84b824"/>'

# Header Logo Pattern (new)
NEW_HEADER='<!-- Klaviertasten (6 weiße Tasten) - ausgewogen positioniert -->
                        <rect x="12" y="26" width="5" height="16" rx="0.8" fill="white" stroke="#638a1c" stroke-width="1"/>
                        <rect x="17" y="26" width="5" height="16" rx="0.8" fill="white" stroke="#638a1c" stroke-width="1"/>
                        <rect x="22" y="26" width="5" height="16" rx="0.8" fill="white" stroke="#638a1c" stroke-width="1"/>
                        <rect x="27" y="26" width="5" height="16" rx="0.8" fill="white" stroke="#638a1c" stroke-width="1"/>
                        <rect x="32" y="26" width="5" height="16" rx="0.8" fill="white" stroke="#638a1c" stroke-width="1"/>
                        <rect x="37" y="26" width="5" height="16" rx="0.8" fill="white" stroke="#638a1c" stroke-width="1"/>

                        <!-- Schwarze Tasten (4 Tasten) -->
                        <rect x="15.5" y="26" width="3" height="10" rx="0.4" fill="#638a1c"/>
                        <rect x="20.5" y="26" width="3" height="10" rx="0.4" fill="#638a1c"/>
                        <rect x="30.5" y="26" width="3" height="10" rx="0.4" fill="#638a1c"/>
                        <rect x="35.5" y="26" width="3" height="10" rx="0.4" fill="#638a1c"/>

                        <!-- Marimba-Schlägel (ausgewogen positioniert, beide gleich) -->
                        <!-- Schlägel 1 -->
                        <line x1="50" y1="16" x2="42" y2="30" stroke="#638a1c" stroke-width="1.2" stroke-linecap="round"/>
                        <circle cx="50.5" cy="15" r="2.5" fill="#84b824"/>
                        <!-- Schlägel 2 -->
                        <line x1="45" y1="20" x2="37" y2="34" stroke="#638a1c" stroke-width="1.2" stroke-linecap="round"/>
                        <circle cx="45.5" cy="19" r="2.5" fill="#84b824"/>'

# Update all HTML files
for file in klavier.html blockfloete.html marimba.html probestunde.html impressum.html datenschutz.html; do
    echo "Updating $file..."
    python3 -c "
import sys
with open('$file', 'r', encoding='utf-8') as f:
    content = f.read()
content = content.replace('''$OLD_HEADER''', '''$NEW_HEADER''')
with open('$file', 'w', encoding='utf-8') as f:
    f.write(content)
"
done

echo "Done!"
