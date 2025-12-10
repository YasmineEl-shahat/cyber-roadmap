interface DomainsFieldProps {
  domains: string[];
}

export default function DomainsField({ domains }: DomainsFieldProps) {
  return (
    <div className="col-span-2">
      <p className="text-muted-foreground">Domains covered:</p>
      <p className="text-foreground mt-1">
        {domains && domains.length > 0 ? domains.join(", ") : "None"}
      </p>
    </div>
  );
}
