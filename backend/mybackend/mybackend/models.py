from django.db import models

class IR(models.Model):
    designacion_mm = models.CharField(max_length=50)
    designacion_pulg = models.CharField(max_length=50)
    d = models.FloatField()
    h = models.FloatField()
    tw = models.FloatField()
    bf = models.FloatField()
    tf = models.FloatField()
    peso = models.FloatField()
    area = models.FloatField()
    ix = models.FloatField()
    zx = models.FloatField()
    sx = models.FloatField()
    rx = models.FloatField()
    iy = models.FloatField()
    zy = models.FloatField()
    sy = models.FloatField()
    ry = models.FloatField()
    j = models.FloatField()
    cw = models.FloatField()

class HP(models.Model):
    designacion_mm = models.CharField(max_length=50)
    designacion_pulg = models.CharField(max_length=50)
    d = models.FloatField()
    T = models.FloatField()
    tw = models.FloatField()
    bf = models.FloatField()
    tf = models.FloatField()
    k = models.FloatField()
    k1 = models.FloatField()
    peso = models.FloatField()
    area = models.FloatField()
    b2ft = models.FloatField()
    htw = models.FloatField()
    ix = models.FloatField()
    zx = models.FloatField()
    sx = models.FloatField()
    rx = models.FloatField()
    iy = models.FloatField()
    zy = models.FloatField()
    sy = models.FloatField()
    ry = models.FloatField()
    j = models.FloatField()
    cw = models.FloatField()

class CE(models.Model):
    
    designacion_mm = models.CharField(max_length=50)
    designacion_pulg = models.CharField(max_length=50)
    d = models.FloatField(help_text="Peralte (mm)")
    h = models.FloatField(help_text="Altura del alma (mm)")
    tw = models.FloatField(help_text="Espesor del alma (mm)")
    bf = models.FloatField(help_text="Ancho del patín (mm)")
    tf = models.FloatField(help_text="Espesor del patín (mm)")
    k = models.FloatField(help_text="Distancia k (mm)")
    T = models.FloatField(help_text="Altura total del alma T (mm)")
    x_barra = models.FloatField(help_text="Centroide x̄ (mm)")
    eo_cortante = models.FloatField(help_text="Excentricidad al centro cortante eₒ (mm)")
    g = models.FloatField(help_text="Gramíl g (mm)")
    g1 = models.FloatField(help_text="Gramíl g₁ (mm)")
    sujetadores = models.CharField(max_length=20, help_text="Diámetro de sujetadores (pulg.)")
    area = models.FloatField(help_text="Área de la sección (cm²)")
    peso = models.FloatField(help_text="Peso (kg/m)")
    ix = models.FloatField(help_text="Inercia Ixx (cm⁴)")
    zx = models.FloatField(help_text="Módulo plástico Zxx (cm³)")
    sx = models.FloatField(help_text="Módulo elástico Sxx (cm³)")
    rx = models.FloatField(help_text="Radio de giro rxx (cm)")
    iy = models.FloatField(help_text="Inercia Iyy (cm⁴)")
    zy = models.FloatField(help_text="Módulo plástico Zyy (cm³)")
    sy = models.FloatField(help_text="Módulo elástico Syy (cm³)")
    ry = models.FloatField(help_text="Radio de giro ryy (cm)")
    j = models.FloatField(help_text="Módulo de torsión J (cm⁴)")
    cw = models.FloatField(help_text="Constante de alabeo Cw (cm⁶)")
    ro = models.FloatField(help_text="Radio polar rₒ (cm)")
    h_torsion = models.FloatField(help_text="Constante H (adimensional)")

class CF(models.Model):

    designacion_mm = models.CharField(max_length=100)
    designacion_pulg = models.CharField(max_length=100)
    calibre = models.CharField(max_length=10)
    peso_aprox = models.FloatField(help_text="Peso aproximado (kg/m)")
    h_o = models.FloatField(help_text="Altura hₒ (mm)")
    b_o = models.FloatField(help_text="Ancho bₒ (mm)")
    c = models.FloatField(help_text="Labio c (mm)")
    t = models.FloatField(help_text="Espesor t (mm)")
    R = models.FloatField(help_text="Radio de doblado R (mm)")
    area_total = models.FloatField(help_text="Área total A (cm²)")
    # Propiedades para Fy = 50 ksi
    ae_50 = models.FloatField(help_text="Área efectiva Ae (Fy=50 ksi)")
    idx_50 = models.FloatField(help_text="Inercia X-X (Fy=50 ksi)")
    sxe_50 = models.FloatField(help_text="Sxe (Fy=50 ksi)")
    mnxo_50 = models.FloatField(help_text="Mnxo (Fy=50 ksi)")
    # Propiedades para Fy = 33 ksi
    ae_33 = models.FloatField(help_text="Área efectiva Ae (Fy=33 ksi)")
    idx_33 = models.FloatField(help_text="Inercia X-X (Fy=33 ksi)")
    sxe_33 = models.FloatField(help_text="Sxe (Fy=33 ksi)")
    mnxo_33 = models.FloatField(help_text="Mnxo (Fy=33 ksi)")
    rx = models.FloatField(help_text="Radio de giro rx (Fy=33 ksi)")
    # Eje Y-Y
    iy = models.FloatField(help_text="Iy (cm⁴)")
    sy = models.FloatField(help_text="Sy (cm³)")
    ry = models.FloatField(help_text="ry (cm)")
    # Torsión y centroides
    j = models.FloatField(help_text="Módulo de torsión J (cm⁴)")
    cw = models.FloatField(help_text="Constante de alabeo Cw (cm⁶)")
    x_barra = models.FloatField(help_text="x̄ (cm)")
    x_c = models.FloatField(help_text="xc (cm)")
    e_o = models.FloatField(help_text="eₒ (cm)")


    def __str__(self):
        return f"{self.designacion_mm} / {self.designacion_pulg}"

class HR(models.Model):
    designacion_metrico = models.CharField(max_length=50)
    designacion_ingles = models.CharField(max_length=50)

    # Peralte
    d = models.FloatField()

    # Alma
    h = models.FloatField()
    tw = models.FloatField()

    # Patín
    bf = models.FloatField()
    tf = models.FloatField()

    # Distancias
    k_dis = models.FloatField()
    k_det = models.FloatField()
    k1 = models.FloatField()
    T = models.FloatField()

    # Gramiles
    g = models.FloatField()
    g1 = models.FloatField()

    # Sujetadores
    diametro_sujetador_mm = models.FloatField()
    diametro_sujetador_pulg = models.CharField(max_length=20)

    # Área y pandeo
    area = models.FloatField()
    b_2tf = models.FloatField()
    h_tw = models.FloatField()

    # Propiedades en eje X-X
    ix = models.FloatField()
    zx = models.FloatField()
    sx = models.FloatField()
    rx = models.FloatField()

    # Propiedades en eje Y-Y
    iy = models.FloatField()
    zy = models.FloatField()
    sy = models.FloatField()
    ry = models.FloatField()

    # Torsión
    j = models.FloatField()
    cw = models.FloatField()

class IC(models.Model):
    designacion_metrico = models.CharField(max_length=50)
    designacion_ingles = models.CharField(max_length=50)

    # Peralte
    d = models.FloatField()

    # Ancho total
    d1 = models.FloatField()

    # Alma
    h = models.FloatField()
    tw = models.FloatField()

    # Patín
    bf = models.FloatField()
    tf = models.FloatField()

    # Distancia entre ejes
    e = models.FloatField()

    # Dimensiones adicionales
    k_det = models.FloatField()
    T1 = models.FloatField()

    # Gramil
    g = models.FloatField()

    # Sujetadores
    diametro_sujetador_mm = models.FloatField()
    diametro_sujetador_pulg = models.CharField(max_length=20)

    # Área y pandeo
    area = models.FloatField()
    b_2tf = models.FloatField()

    # Propiedades X-X y Y-Y (idénticas en este caso)
    i = models.FloatField()
    z = models.FloatField()
    s = models.FloatField()
    r = models.FloatField()

    # Torsión
    j = models.FloatField()
    cw = models.FloatField()

class IE(models.Model):
    designacion_metrico = models.CharField(max_length=50)
    designacion_ingles = models.CharField(max_length=50)

    # Peralte
    d = models.FloatField()

    # Alma
    h = models.FloatField()
    tw = models.FloatField()

    # Patín
    bf = models.FloatField()
    tf = models.FloatField()

    # Distancias
    k = models.FloatField()
    T = models.FloatField()

    # Gramiles
    g = models.FloatField()
    g1 = models.FloatField()

    # Sujetadores
    diametro_sujetador_mm = models.FloatField(null=True, blank=True)
    diametro_sujetador_pulg = models.CharField(max_length=20, null=True, blank=True)

    # Área y pandeo
    area = models.FloatField()
    b_2tf = models.FloatField()
    h_tw = models.FloatField()

    # Propiedades X - X
    ix = models.FloatField()
    zx = models.FloatField()
    sx = models.FloatField()
    rx = models.FloatField()

    # Propiedades Y - Y
    iy = models.FloatField()
    zy = models.FloatField()
    sy = models.FloatField()
    ry = models.FloatField()

    # Torsión
    j = models.FloatField()
    cw = models.FloatField()

class IRR(models.Model):
    designacion_metrico = models.CharField(max_length=50)
    designacion_ingles = models.CharField(max_length=50)

    # Peralte
    d = models.FloatField()

    # Alma
    h = models.FloatField()
    tw = models.FloatField()

    # Patín
    bf = models.FloatField()
    tf = models.FloatField()

    # Distancias
    k_dis = models.FloatField()
    k_det = models.FloatField()
    k1 = models.FloatField()
    T = models.FloatField()

    # Gramiles
    g = models.FloatField()
    g1 = models.FloatField()

    # Sujetadores
    diametro_sujetador_mm = models.FloatField(null=True, blank=True)
    diametro_sujetador_pulg = models.CharField(max_length=20, null=True, blank=True)

    # Área y pandeo local
    area = models.FloatField()
    b_2tf = models.FloatField()
    h_tw = models.FloatField()

    # Propiedades eje X - X
    ix = models.FloatField()
    zx = models.FloatField()
    sx = models.FloatField()
    rx = models.FloatField()

    # Propiedades eje Y - Y
    iy = models.FloatField()
    zy = models.FloatField()
    sy = models.FloatField()
    ry = models.FloatField()

    # Torsión
    j = models.FloatField()
    cw = models.FloatField()

class LD(models.Model):
    designacion_metrico = models.CharField(max_length=100)
    designacion_ingles = models.CharField(max_length=100)
    peso = models.FloatField()
    area = models.FloatField()

    # Dimensiones
    k = models.FloatField()
    g = models.FloatField()
    g1 = models.FloatField(null=True, blank=True)
    g2 = models.FloatField(null=True, blank=True)

    # Sujetadores
    diametro_sujetador_mm = models.FloatField(null=True, blank=True)
    diametro_sujetador_pulg = models.CharField(max_length=20, null=True, blank=True)

    # Eje X - X
    ix = models.FloatField()
    zx = models.FloatField()
    sx = models.FloatField()
    rx = models.FloatField()
    yx = models.FloatField()

    # Eje Y - Y
    iy = models.FloatField()
    zy = models.FloatField()
    sy = models.FloatField()
    ry = models.FloatField()
    xbar = models.FloatField()

    # Eje W - W
    iww = models.FloatField()
    sww = models.FloatField()
    rww = models.FloatField()

    # Eje Z - Z
    izz = models.FloatField()
    szz = models.FloatField()
    rzz = models.FloatField()

    # Torsión
    j = models.FloatField()
    cw = models.FloatField()
    ro = models.FloatField()

class LI(models.Model):
    designacion_metrico = models.CharField(max_length=50)
    designacion_ingles = models.CharField(max_length=50)
    peso = models.FloatField()
    area = models.FloatField()

    # Dimensiones
    k = models.FloatField()
    g = models.FloatField()
    g1 = models.FloatField(null=True, blank=True)
    g2 = models.FloatField(null=True, blank=True)

    # Sujetadores
    diametro_sujetador_mm = models.FloatField(null=True, blank=True)
    diametro_sujetador_pulg = models.CharField(max_length=20, null=True, blank=True)

    # Propiedades de torsión
    j = models.FloatField()
    cw = models.FloatField()
    ro = models.FloatField()

    # Propiedades eje X - X y Y - Y (son iguales)
    i_xy = models.FloatField()
    z_xy = models.FloatField()
    s_xy = models.FloatField()
    r_xy = models.FloatField()
    xbarra_ybarra = models.FloatField()

    # Eje Z - Z
    i_zz = models.FloatField()
    s_zz = models.FloatField()
    r_zz = models.FloatField()

class OC(models.Model):
    designacion_metrico = models.CharField(max_length=50)
    designacion_ingles = models.CharField(max_length=50)
    
    t_diseño = models.FloatField()
    peso_kg_m = models.FloatField()
    peso_lb_ft = models.FloatField()
    area = models.FloatField()
    pandeo_local = models.FloatField()

    # Propiedades X - X y Y - Y (simétricas)
    i = models.FloatField()
    z = models.FloatField()
    s = models.FloatField()
    r = models.FloatField()

    # Torsión
    j = models.FloatField()
    c = models.FloatField()

class ORC(models.Model):
    designacion_metrico = models.CharField(max_length=100)
    designacion_ingles = models.CharField(max_length=100)
    
    t_diseno = models.FloatField()
    peso_kg_m = models.FloatField()
    peso_lb_ft = models.FloatField()
    area = models.FloatField()
    pandeo_local = models.FloatField()
    superficie_exterior = models.FloatField()

    # Propiedades X - X y Y - Y (simétricas)
    i = models.FloatField()
    z = models.FloatField()
    s = models.FloatField()
    r = models.FloatField()

    # Torsión
    j = models.FloatField()
    c = models.FloatField()

    # Dimensiones
    d = models.FloatField(default=0.0)
    t = models.FloatField(default=0.0)

class ORR(models.Model):
    designacion_metrico = models.CharField(max_length=100)
    designacion_ingles = models.CharField(max_length=100)
    
    t_diseno = models.FloatField()
    peso_kg_m = models.FloatField()
    peso_lb_ft = models.FloatField()
    area = models.FloatField()

    # Pandeo local
    pandeo_b_t = models.FloatField()
    pandeo_h_t = models.FloatField()

    # Superficie exterior
    superficie_exterior = models.FloatField()

    # Propiedades eje X - X
    ix = models.FloatField()
    ix_1 = models.FloatField()
    zx = models.FloatField()
    sx = models.FloatField()
    rx = models.FloatField()

    # Propiedades eje Y - Y
    iy = models.FloatField()
    zy = models.FloatField()
    sy = models.FloatField()
    ry = models.FloatField()

    # Torsión
    j = models.FloatField()
    c = models.FloatField()

    # Longitudes planas
    longitud_plana_vertical = models.FloatField()
    longitud_plana_horizontal = models.FloatField()

    # Dimensiones
    d = models.FloatField(default=0.0)
    b = models.FloatField(default=0.0)
    t = models.FloatField(default=0.0)

class OS(models.Model):
    designacion_diametro_metrico = models.CharField(max_length=50)
    designacion_diametro_ingles = models.CharField(max_length=50)
    
    peso_kg_m = models.FloatField()
    peso_lb_ft = models.FloatField()
    area = models.FloatField()

    # Propiedades estructurales X - X y Y - Y (simétricas)
    i = models.FloatField()
    s = models.FloatField()
    r = models.FloatField()

class TR(models.Model):
    designacion_metrico = models.CharField(max_length=100)
    designacion_ingles = models.CharField(max_length=100)

    # Geometría
    d = models.FloatField()
    h = models.FloatField()
    tw = models.FloatField()
    bf = models.FloatField()
    tf = models.FloatField()

    # Distancias
    k_dis = models.FloatField()
    k_det = models.FloatField()
    k1 = models.FloatField()

    # Gramiles
    g = models.FloatField()
    g1 = models.FloatField()

    # Sujetadores
    diametro_sujetador_mm = models.FloatField()
    diametro_sujetador_pulg = models.CharField(max_length=20)

    # Área y relación de pandeo
    area = models.FloatField()
    h_tw = models.FloatField()

    # Eje X - X
    ix = models.FloatField()
    zx = models.FloatField()
    sx = models.FloatField()
    rx = models.FloatField()
    y_barra = models.FloatField()

    # Eje Y - Y
    iy = models.FloatField()
    zy = models.FloatField()
    sy = models.FloatField()
    ry = models.FloatField()

    # Torsión
    j = models.FloatField()
    cw = models.FloatField()

class ZF(models.Model):
    designacion_metrico = models.CharField(max_length=100)
    designacion_ingles = models.CharField(max_length=100)
    calibre = models.CharField(max_length=10)
    espesor_pulg = models.FloatField()
    espesor_mm = models.FloatField()
    peso_kg_m = models.FloatField()

    # Geometría
    ho = models.FloatField()
    bo = models.FloatField()
    c = models.FloatField()
    R = models.FloatField()

    # Área
    area_total = models.FloatField()

    # Propiedades efectivas en X para Fy = 3515
    ae_3515 = models.FloatField()
    idx_3515 = models.FloatField()
    sxe_3515 = models.FloatField()

    # Propiedades efectivas en X para Fy = 2320
    ae_2320 = models.FloatField()
    idx_2320 = models.FloatField()
    sxe_2320 = models.FloatField()

    # Otras propiedades
    rx = models.FloatField()
    iy = models.FloatField()
    sy = models.FloatField()
    ry = models.FloatField()
    ixy = models.FloatField()
    ix2 = models.FloatField()
    iy2 = models.FloatField()
    rmin = models.FloatField()
    theta = models.FloatField()
    j = models.FloatField()
    cw = models.FloatField()
    

class ConceptoObra(models.Model):
    clave = models.CharField(max_length=40, unique=True)  # Clave identificadora, única
    descripcion = models.TextField()  # Descripción del concepto
    unidad = models.CharField(max_length=10)  # Unidad de medida (m2, m3, pieza, etc.)
    costo_directo = models.DecimalField(max_digits=12, decimal_places=2)  # Costo directo con precisión

    def __str__(self):
        return f"{self.clave} - {self.descripcion[:50]}"

class Infraestructura(models.Model):
    clave = models.CharField(max_length=40, unique=True)  # Clave identificadora, única
    descripcion = models.TextField()  # Descripción del concepto
    unidad = models.CharField(max_length=10)  # Unidad de medida (m2, m3, pieza, etc.)
    costo_directo = models.DecimalField(max_digits=12, decimal_places=2)  # Costo directo con precisión

    def __str__(self):
        return f"{self.clave} - {self.descripcion[:50]}"

class CEAS(models.Model):
    clave = models.CharField(max_length=40, unique=True)  # Clave identificadora, única
    descripcion = models.TextField()  # Descripción del concepto
    unidad = models.CharField(max_length=10)  # Unidad de medida (m2, m3, pieza, etc.)
    costo_directo = models.DecimalField(max_digits=12, decimal_places=2)  # Costo directo con precisión

    def __str__(self):
        return f"{self.clave} - {self.descripcion[:50]}"

class SEP(models.Model):
    clave = models.CharField(max_length=40, unique=True)  # Clave identificadora, única
    descripcion = models.TextField()  # Descripción del concepto
    unidad = models.CharField(max_length=10)  # Unidad de medida (m2, m3, pieza, etc.)
    costo_directo = models.DecimalField(max_digits=12, decimal_places=2)  # Costo directo con precisión

    def __str__(self):
        return f"{self.clave} - {self.descripcion[:50]}"

class SCPT_AP(models.Model):
    clave = models.CharField(max_length=40, unique=True)  # Clave identificadora, única
    descripcion = models.TextField()  # Descripción del concepto
    unidad = models.CharField(max_length=10)  # Unidad de medida (m2, m3, pieza, etc.)
    costo_directo = models.DecimalField(max_digits=12, decimal_places=2)  # Costo directo con precisión

    def __str__(self):
        return f"{self.clave} - {self.descripcion[:50]}"

class SCPT_BP(models.Model):
    clave = models.CharField(max_length=40, unique=True)  # Clave identificadora, única
    descripcion = models.TextField()  # Descripción del concepto
    unidad = models.CharField(max_length=10)  # Unidad de medida (m2, m3, pieza, etc.)
    costo_directo = models.DecimalField(max_digits=12, decimal_places=2)  # Costo directo con precisión

    def __str__(self):
        return f"{self.clave} - {self.descripcion[:50]}"


 
