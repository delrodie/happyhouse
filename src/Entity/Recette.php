<?php

namespace App\Entity;

use App\Repository\RecetteRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: RecetteRepository::class)]
class Recette
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['pain'])]
    private ?int $id = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE, nullable: true)]
    #[Assert\NotBlank]
    #[Groups(['pain'])]
    private ?\DateTimeInterface $date = null;

    #[ORM\Column(nullable: true)]
    #[Assert\NotBlank]
    #[Assert\PositiveOrZero]
    #[Groups(['pain'])]
    private ?int $montantTotal = null;

    #[ORM\Column(nullable: true)]
    #[Assert\NotBlank]
    #[Assert\PositiveOrZero]
    #[Groups(['pain'])]
    private ?int $beneficeTotal = null;

    #[ORM\Column(nullable: true)]
    #[Assert\NotBlank]
    #[Assert\PositiveOrZero]
    #[Groups(['pain'])]
    private ?int $resteTotal = null;

    #[ORM\OneToMany(mappedBy: 'recette', targetEntity: Vente::class, cascade: ['remove'])]
    #[Groups(['pain'])]
    private Collection $ventes;

    public function __construct()
    {
        $this->ventes = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getDate(): ?\DateTimeInterface
    {
        return $this->date;
    }

    public function setDate(?\DateTimeInterface $date): self
    {
        $this->date = $date;

        return $this;
    }

    public function getMontantTotal(): ?int
    {
        return $this->montantTotal;
    }

    public function setMontantTotal(?int $montantTotal): self
    {
        $this->montantTotal = $montantTotal;

        return $this;
    }

    public function getBeneficeTotal(): ?int
    {
        return $this->beneficeTotal;
    }

    public function setBeneficeTotal(?int $beneficeTotal): self
    {
        $this->beneficeTotal = $beneficeTotal;

        return $this;
    }

    public function getResteTotal(): ?int
    {
        return $this->resteTotal;
    }

    public function setResteTotal(?int $resteTotal): self
    {
        $this->resteTotal = $resteTotal;

        return $this;
    }

    /**
     * @return Collection<int, Vente>
     */
    public function getVentes(): Collection
    {
        return $this->ventes;
    }

    public function addVente(Vente $vente): self
    {
        if (!$this->ventes->contains($vente)) {
            $this->ventes->add($vente);
            $vente->setRecette($this);
        }

        return $this;
    }

    public function removeVente(Vente $vente): self
    {
        if ($this->ventes->removeElement($vente)) {
            // set the owning side to null (unless already changed)
            if ($vente->getRecette() === $this) {
                $vente->setRecette(null);
            }
        }

        return $this;
    }
}
