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

    def __str__(self):
        return f"{self.designacion_mm} / {self.designacion_pulg}"
