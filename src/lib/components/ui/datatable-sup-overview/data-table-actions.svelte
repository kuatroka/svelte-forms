<script lang="ts">
    import * as DropdownMenu from "$lib/components/ui/dropdown-menu";
    import { Button } from "$lib/components/ui/button";
    
    
    export let id: string;
  </script>
  <DropdownMenu.Root >
    <DropdownMenu.Trigger asChild let:builder>
      <Button
        variant="ghost"
        builders={[builder]}
        size="icon"
        class="relative w-4 h-4 p-0"
      >
        <span class="sr-only">Open menu</span>
        <iconify-icon icon="heroicons:ellipsis-horizontal-16-solid" class="w-4 h-4"></iconify-icon>
      </Button>
    </DropdownMenu.Trigger>
    <DropdownMenu.Content>
      <DropdownMenu.Group>
        <DropdownMenu.Label>Actions</DropdownMenu.Label>
        <DropdownMenu.Item on:click={() => navigator.clipboard.writeText(id)}>
          Copy payment ID
        </DropdownMenu.Item>
      </DropdownMenu.Group>
      <DropdownMenu.Separator />
      <DropdownMenu.Item>View customer</DropdownMenu.Item>
      <DropdownMenu.Item>View payment details</DropdownMenu.Item>
    </DropdownMenu.Content>
  </DropdownMenu.Root>