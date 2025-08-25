
#Procedimientos realizados para corregir errores en el proyecto React 
Native 
Este documento recopila todos los procedimientos realizados durante la resolución de 
problemas en el entorno de desarrollo de un proyecto React Native con Android. Se 
incluyen cambios en las versiones de dependencias, ajustes de configuración, ejecución de 
diagnósticos, instalación de NDK y herramientas adicionales, y análisis de resultados. El 
propósito de este documento es dejar un registro claro y ordenado de cada intento y su 
efecto. 
1. Diagnóstico inicial 
• Se utilizó el comando `npx react-native doctor` para identificar posibles inconsistencias en 
las herramientas instaladas. 
• El diagnóstico reportó problemas relacionados con el SDK de Android, versiones del NDK 
y configuraciones de Gradle. 
• Se detectaron incompatibilidades entre las versiones instaladas y las que esperaba el 
proyecto. 
Android 
✓ Adb - No devices and/or emulators connected. Please create emulator with Android 
Studio or connect Android device. 
✓ JDK - Required to compile Java code 
✓ Android Studio - Required for building and installing your app on Android 
✓ ANDROID_HOME - Environment variable that points to your Android SDK installation 
✓ Gradlew - Build tool required for Android builds 
✓ Android SDK - Required for building and installing your app on Android 
Todos los requisites se cumplen. 
2. Ajustes de versiones 
• Se revisaron diferentes versiones del NDK. se instalar la versión 26.1.10909125. 
• Luego, se recomendó la actualización a la versión 26.3.11579264, ya que estaba soportada 
por Gradle y React Native despues de que la general solicitada por el Proyecto 27… no 
funcionara. 
• Sin embargo, se encontraron errores debido a la ausencia del archivo `source.properties` 
en las carpetas de instalación, lo cual fue corregido pero no funcionó aún creando el 
Proyecto de nuevo. 
• Se intentó limpiar y reinstalar versiones, pero la configuración seguía fallando. 
3. Configuración en build.gradle y variables 
• Se realizaron cambios en el archivo `gradle.properties` para establecer explícitamente las 
versiones del NDK y CMake: - ANDROID_NDK_VERSION=26.1.10909125 - CMAKE_VERSION=3.22.1 
• También se probaron ajustes en el archivo `android/build.gradle` para forzar 
compatibilidad con estas versiones. 
• A pesar de los cambios, el error persistía con mensajes sobre NDK corrupto o incompleto. 
4. Dependencias adicionales 
• Se revisaron y discutieron las versiones de React Native, Kotlin y Vision Camera: - React Native: se confirmó que la versión instalada esperaba NDK dentro de un rango 
compatible con la 26.x. - Kotlin: se validó que no presentara conflictos directos, aunque podía verse afectado por 
Gradle. - Vision Camera: al ser una librería nativa, depende fuertemente de la correcta instalación 
del NDK. 
• Se intentó alinear todas estas dependencias con el entorno de Android configurado. 
5. Comandos ejecutados 
• `npx react-native doctor`: diagnóstico de inconsistencias. 
• `./gradlew clean`: para limpiar compilaciones previas. 
• Instalación de diferentes versiones del NDK desde Android SDK Manager. 
• Eliminación manual de carpetas de NDK corruptas. 
• Ajustes repetidos en gradle.properties y build.gradle para establecer versiones. 
6. Verificación inicial con NPX React Doctor 
Se ejecutó el comando 'npx react-native doctor' para diagnosticar problemas comunes en el 
entorno de desarrollo. Este comando permitió identificar configuraciones desactualizadas y 
posibles incompatibilidades en el SDK de Android y dependencias asociadas. El resultado 
indicó ajustes necesarios en versiones de NDK, CMake y Gradle. 
7. Revisión de versiones de NDK y CMake 
Se realizó la verificación de la versión del NDK y CMake instaladas en el sistema. 
Inicialmente se sugirió la instalación de la versión del NDK 26.1.10909125, la cual fue 
descargada e instalada desde el SDK Manager. Sin embargo, al intentar compilar 
nuevamente el proyecto, surgió un error debido a que la instalación estaba incompleta, 
específicamente porque faltaba el archivo 'source.properties' en la carpeta del NDK. 
8. Intento de corrección mediante reinstalación del NDK 
Ante la ausencia del archivo 'source.properties', se procedió a recomendar la reinstalación 
del NDK desde el SDK Manager de Android Studio. Se sugirió también probar con la versión 
más reciente y estable del NDK de la rama 26, es decir, la versión 26.3.11579264. Además, 
se verificó que en el archivo 'local.properties' se estuviera apuntando correctamente a la 
ruta del SDK y del NDK. 
9. Resultados obtenidos 
• A pesar de múltiples intentos, los errores relacionados con el NDK persistieron. 
• El error principal fue la falta de `source.properties` dentro del directorio de NDK 
descargado. 
• Algunos comandos funcionaron correctamente en ocasiones anteriores, pero dejaron de 
funcionar tras los cambios. 
• La compilación fallaba recurrentemente al ejecutar `./gradlew clean` y `gradlew build`. 
10. Conclusión personal 
Después de todos estos intentos, considero que el problema radica en una combinación de 
factores: incompatibilidades entre versiones de React Native, Vision Camera y el NDK; 
además de la descarga incompleta o corrupta de algunas versiones del NDK. A pesar de 
seguir cada paso, no fue posible lograr una compilación estable. Mi conclusión fue que 
necesito rehacer la configuración desde cero con una versión de React Native estable y 
validada, junto con el NDK específico que ese release recomienda. Esto evitaría seguir 
probando configuraciones que no dieron resultados sin embargo tras repetir el proceso en 
repetidas ocasiones no se obtuvieron resultados óptimos.
