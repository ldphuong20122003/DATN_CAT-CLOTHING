import React from "react";
import { View } from "react-native";
import ListShop from "./component/ListShop";

const Shop = () => {
  const default_data = [
    {
      image:
        "data:image/jpeg;base64,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",
      name: "Louis Vuitton",
    },
    {
      image:
        "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCACwAJQDASIAAhEBAxEB/8QAGgAAAQUBAAAAAAAAAAAAAAAAAQACAwQFBv/EAD4QAAIBAwEEBgcGBQQDAQAAAAECAwAEESESEzFBBSJRYXHwFDJCgZGxwQYjM6HR4UNSYoLxJDRTcmOSwqL/xAAZAQEBAQEBAQAAAAAAAAAAAAAAAQMCBAX/xAAmEQEBAAIBAgUEAwAAAAAAAAAAAQIRAxJRISIxQZEEYaHRgbHB/9oADAMBAAIRAxEAPwDqprqKDZ3jhS2gzzqo3SRjmCzxFEbhIG2lrPmu5Xh3sYF5C/FGHWj+FVVuNiBvRm39u34kLasvnz21Wsxjp0kDgMpBB4EVIDWFYO0OzudoWzAnYkGGU8T7v176HSPSrRBIY3VJ5F2+voADwHjRzcW9mlXJWXS980h4O6jBifRiO0Gte06ajlcRSDdS81k0odNa1DNRxzJJ6p17DT6ORzRptKiHUqFKgp9KTCCxmkPJSB4muHTvrr/tGjv0W5TgpBYdorjlNcZvqfRydFpzpmoJIMqTjTOKsZprZxjOlZvZcdqDREUzBBq6y1E8Ypt58uHXjEQkIFKnNEBjBzka91KjPzullDXM7NauY51OyJI1KpIOZ7vPGrccUFvmXYBmEe2X2cZzoPiTnwpq3CslwYW2YlAhiGNAD/j86sbBaRyrAh7lIsdy16HjCVcEwq5JLJDntz1m+lYvS8pm6RmVm249vGwwwDjTqmtu0ZpZoGZQdqSRz8MVgyQyS7ySIrsyHLxMdM/MePColNt22zh1M6LoFJ2ZE/WrO2zERM6y/wDjuBsuPBqqwxiVSojaTd8Yn6si+B5irSB5YiI2E6+1DJo4HcaETJcPbSKI2dVH8G4Oh/6tW1Y9ICVcNtZHFT6yePaO+sKECSBkgzcQJq8Emjr4EU2MgYmt2bMegU+vGPqKJZt2AIYAggg8CKVZXR16GDLs4IG04GobPtLWqpDKGU5B1FGdmhpUKVVyEiLLGyOMqwwRXB9IWr9H3jQsTpqp7RXfZrB+1FiZrZblBl4uP/WucpuPV9NydGer6VzIYe+nY0zUUQ2mA+lTZwKxfXlRlRqcjwphWnk0V1oqErSqRhrSqJqOigi2EhSNFdWu8g8cgc/zqeNgVt3dTlpJZPhnFRWcaBLFW2lK7cjDtI/xSjISC2USHKwyucjtz+9eh8an2hWNYzkrsWztkd7VnQhSwW3zFfDVSeDjs89laJYiGY7S7Poqr4bRNUpnDGK2uU3W1GjRzjkdkaH3+edAHhS92TFHs3cY68ZJX/1/SmuMbUsoZ1XRbiMdaM9jgfOqfTV5cwiKJ1CzLwnRsFhVboy5ubVlkV1KOclSdW4g11pxcpvTWyHCG6OyfZuoTofEilJnIku1LKukdzDy8cVJCsU0cl3YEwjH3sbDaBHbjmPzqBZRBdbMRWKQ/wAIkmOTw7PfUdbSwl0KklQ56wcHqt3+/gfca2rG9UgB+qCcFf5TWDGEZpPR1KyE5ktyOHep+nZUkc2xqpOyq4937Hs1HeKiWbdXSqnYXW9UIx6wHZxq5RlZoqDKHUqwyDoRRpVUcD0jamxv5IcYUHKd45VCXGK6v7RdH+l2u9Qfex6jvHZXKW0L3EgSNGduxaxymq+xwc0yw3fYAM68qs2ltLds0dtEZG7fZHia1bL7OFyDdPhc+ov1NdJBBHbxhIkCqOAAqzDuy5fq5PDBi232ah3K+lO7S89g4A8KVb1Ku9R4rzcl8dsKIyBAxZWIsyxJ5E61E20pY7AwlmAPE/5qa86hvAIuSRrg8sVDcqu1fHrov3ca558M/Kq6C9AjguA0fBYgQO7Wq/Ssk1sJvud9aKApXmp2R8KuXuzvbk7WQ8iKf/Uiqt4sgv7m4RhKinEkPNlwNaI5OSeSfG9dmAGACeHhVmxuzBIqOqDXBLjOO/xFXr6xQx+nWL4XOq8Cp7/jVF1juRplZ8naBxitIxylnqtxXUthdLNEMRnJUjTI8K1JrWHpSJbuBticDrIgz7wOY7q5+CXDGG4LbOMY+XuFWYJpujJwVPeD78fSli45e1aYtnjghO8aVsYBByw71P8A8mnITJ1TgyZyTw3v6MKsCSK5he5tlJVh/qFGmz/UvvB/Pvqq0QkcqkilioOW0Eo5EHk1ZtVy0lMUgcEhc6HHEc/8duK6KN1kQMpBB5iuVhmEjF+Bxry2sc+4jn763ujpeoUOmDoMYx51+FHOUXqFGhVZAyhhgjIqGK0ihyIo1QE5OBzqelRSAxTqFKiDSoUqDCnXeF9mQ5a6APgBRYllcMwIa+2fdTNku8WyysGvGfQ8dRRUGSOEumpu9oa8cVG6O623LtsqQ14i/AVVvwUu5rmIt6Qs2yqAaMNKnB20jyjDN8PpTJUYrctCTvWuCqk+ydc0VDbysQ1xaIGkPVmt8aDvx5+dUr3o3MfpthtMh1kX/jNTBWjbas3KyRZMrgesTyFaMQEjG4tju2UffW50LdunPj54GpZtycjl2JbXPdirXo9626tgj7EhymRjOe+tpbOwjm9OSHeWx0aM8UJ51aYRrGILg5tJNYJB7Hnz3dXJnMO6t0ZbG2tpN0zi5jyZI24SDsA8/KpAIzDmWMm0c5BX1omPEfGrDb2RkjnxHeR/gt/yDxoK0m8eWNR6R/GtjwbvHn9+Wnoypi1tPtn2SDtDg6/zeI5+NbnRjbcYdCMBlOh7dPhWS0O9b/THeAtlFxkxHmpHYda0bNUsYYopTsnbDvg5Cdi5HjUSt2lQBpVWQ0qVKiDSpUqBUqVKg4qWW8tZ9gMA0bCTUDZQHXX4VZt+kAywEMQkbll2tNrXU54dulK5spJVFpG2221t3EwOhPYT2VUYTwbSW7GeAetI/wCGB3A6Co3a9pFJJFGY5UVY5t4zO2Nrhw40p1LwTwGeFWllMiuki6DTwOao2k8EseRCku7OyWD7sDPdwpzTRgYVLVSp4DMh+WKBRvuIjMFUyxnZVCwIb+o99OlhnjljmtUklnbrSFdVHd5/wVmukGImaMHmLdV/MkU03MzZaW/cHgQJEU/kaKt7p4k9KjtXbedWW3ZDg94oO8duVicby3m12T60J8+e2iWjbqyEy44bc5PyFIAk5iRQp0OImcfFsUFppWeQ2p2pmQZinQZK0/ZA3c11KUuU0Ij1dx3iqZlkI2HkJx6qkhf/AMrkmmgYGDxPEFf/AIHH+6iLYuQufRYkgWQ9Zhq58T29wyaBjWSFoi2HKsVJOuR76rggFQTx0Uk5yezPD3DTtNRO5lQTFTmC42SoHs4/ag6Tou69KsYpCctjDHvFXM1g2cjWd5cQg9QjexoOfcPl7q2oZknjWSNgytwNVnlNJqVAU6jgqBo1DczpBCzuwVVGSaKiuL+G3k2JJFU4zgmlXD390bu7kmJOCeqOwcqVTbacU03YystswgJg6PX1y3rSHnTJNmW1zMDD0cvqIPWkPnzzqZ2UlZ7qMqOENoo+Y8/SmyKVl3sw39y/qQDUR+Pn9aKzp492qzzqIY1/CgA9bx4aefG1vN0FCzgBtDHaxj5mhLayTShZG9KnPFvZiH60I3CKYDf4jGh3adZ27jRCNuXBeSHZK+q91KRp4U0SJE/3UiZb1lt4A2vial3a7IkhsiSNDJdHT4c6G0doxSXpPNYrVePgaAhrgjLekLs85JFj+lRSBH0lkhkDahWmZ8e4Yp+wGkQQWiLI2m1cNtE/2/CmlLozm2jlyw5RAKqnvIFA1NpVJAMQ5llEQPv1JqPeBUcKuIiesSCFz8295qfZhQbMR25V/GnbXA7qcDbgLPKp9EXIiQ8XbtoIjDhElnBeZvwIxxOOB+Wgq4sYiumic7uK7XGzzV/PzpuzKh62GvptEx/DH00psyAwtDCN5PAdt5Cfa7B55UU+Isy2xjGbiCXdMePV5/lp8a2bK3S2h2I84LFjntNVLW3CSSTkYebBK/y6cPnWjEMCqyyu0opwoCjRwDHArmvtNfkItunF9W8OVdFKpYECuR6e6KnEzXMRaQN6y8x4VHeGt+LEyDzFKo840OhpVy9O3YbUsNxkATdIyetj1UHnHni2FdmaRLVszHPpEzHQDnjz+zo0LB4rWXZK6z3BPrdwNLZSWPZQGCyjOWJ0Mp+tdMjEVHgkjs23Vmussr8WPnz2xxmVAJrV0trIdUNIAWJzqalO7kQSzIYbZfw4BoXPb+/kphtETXC5kOkVqOHdp5+lBTnmtNXInvHJwCTsLnu51c3klvHHCkSCZxgRx8EB7TzNIJJDJ9yFkvm9kYxGvnzrqwFkLQ2ZDMdbmc+z24Pn9AEcQhZrW3fbeTWWfknaPP8AhgQGF7eFt3ap68x1L+FHMLxlIWZLBfxZDxc9ny0/aiBGyK9yNi0X8CMcX76KZso8AmljKQxnqRc5T309nWJo7m4j2pHGIYF9jsz5/Zx3wZZZxtXh/AhHsjtx5/RhEqSncgSXb/jOdRGPpVCO1DIYVk27mYdZ+UQ41d6Pt1SFCBlR6p/m7/0qGyt0LER5eHiZG13h/TjWqi5o4yvsMa5qwoxQVcCnijMRRoUqINRyxLIMEU+lQYV19nbeedpDkE8cGlW7So66q5191NAu9LQ2URwmvWkanSNtbu4vAAB/t4F4Hsz5/SmO6hVnvY+qdLeAcB7vPyFFtuF9qY76+k9Qcohy/LzxNRsdK7x3CyXSiS+fSKJeCjl9aA2o7oqv3nSL+s3sp5HnlTPvInMMTCa7b8SfOiDx88KYvWLW8DbMQ/GuzxPbr5+pIdGC5kt7J8ScZ5zp7hQRRJAywndWUR+8b2pD588qQ3c6FFzBZIfX5yH6+fcurJGtxON1DHpDANN5348/DjVIsjxJdXCbFomkUH83ee7z4vY7EiTXC7c0uNxEOCDlnz+yLyIy3E6by4fAigxog7ceeHwJLwybCfe3MuryHUReB5UDQskczQxuHv3HWfkg560be1EqtEGO6BxK3OVhx91SxW6ldhc7v2pM6y/t8/nfhiCqFVQqjQAUcXLsMaAYAAAHACrKLiszpi4uLW3jNp+Iz44Z0xWUOm+lIvxYV/ujIqWyLjxZZzcdXRrl0+0tyPXgjPhkVYh+0yHSa3dT/Sdr9KnVFvBnPZ0FGshPtDYtxd18VJ+VXbW9gu1LW8gcKcHQjHxq7Z3DKesWqVMzSzVcnUqGaVBgB5IJS7KJ7yUaJyiHnzzMSAqZILZ95Kfx5yfUHPB8/ocSxymGzbbuX/3Ex12B3ef2EYSRGitju7RPxpOcnv8AP0o2JI4ngMVu+zYprLMw1Y9nn/Lm2JbcNJmLo5D1e1z589gDRyx705hsYz1Yxxc0WOEW4ulBjOkFty7vP+KKMxXCTX6BIxpBCPaHkj8veXBS4Wa4G3fN+FCOC9mfP7E7yJ1aYCa+kH3a8RGKHWWYxQkSXn8Sc+x248/sAUSRyusDb29l0kblEOevv+VTW8CrGY42zETl2I1kP6fP5uihjVSsQYK3rseMn7efG1GnAAYA7KOMsjkXJqwi4FCNMVLwFGbA+0TqZYEIz6x447KyVKKSRtxdhEin9KtdPiae/wDu43ZUXiqkjWslllTRgQewiuLZv0fS4ZZhNZWfC88kiKDJJcKDwMiaH8zTlnQrr6K3ihH0FZ6ySKcjIPdR374APWA7dRU3j2a6z7z4/S2wjPGKHXslx8zVvomX0a6JiiL5GGWOQMcduBWNJPk6Ip/tFSJKvFkU/l8qeX7ucpnlNXX5d4rBgCDkEZFHNYHQnSqkraSnB/hnP5VvV3Lt87PC4XVHNKhmlVZudSMSwmGKTdQprJMdN4e6nuwnVZXG5tYj1I+cp8+edA7qZMync2UZ+7HOQ0GYsq3F2uCNLeAcDyGnn6UbHvINtbu6h14RWw+ePPyoqTDLvWG+vZeEfERZ8+eNImSORZpQJOkHHVjxkIPAc/PaabrFM0cH3ly4zPNyTtx5/YCFaPat4ZRJNJrLcA6J3Z8/pZgiVIVjXVBqWxrIe091RW8MYQxxZMGeLcZD2+HnxuIuaOcqci5NWUTFNjTFTAUcCBQkbZU06q9w2mKI5a9ZZL6dipYhsZEgHDTmKaJWU5SW4UH+TrfI1WliuWllkMbgMxbVTrrUJMg4g+FZ2zs+vhjemSZX8VfMjbOsjY572PP60lmQsc+iyeKFfkBVITyjGrfGl6Q41bDH+oZ+dN49lsz7z4/S6ywPqbeEf9ZtfzJpvo0ba7qde8AP+lU/SNMFF1/pFSpOqarmPvViKeVPP9r/ADf9ONtEfUn2T/WpHyzXS9E3xnj3MrIZlGmy2dodtcy1yTrt57mUMfiadFdPBOskSptLwaNjr4g6mrJ4+FZc0mWPmxsvz/Ttc0qr2dyLm2SUDBI1HYaVdvnWaf/Z",
        name: "Văn Hải Luxury",
        
    },
    {
      image:
        "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCACwAJQDASIAAhEBAxEB/8QAGgAAAwEBAQEAAAAAAAAAAAAAAAECAwQFBv/EADAQAAIBAwMCBQIGAgMAAAAAAAABAgMEERIhMUFRBRMiYXEykRRSgaHR8CNCscHh/8QAFwEBAQEBAAAAAAAAAAAAAAAAAAECA//EABoRAQEBAQEBAQAAAAAAAAAAAAABEQIhMTL/2gAMAwEAAhEDEQA/APqxDEaAIAABAACAAAQABQhDEAgAQAIYgEIYgEAAB2AAiAABAAAIAABFAIYgAQAAhDEAhDBproAiRiAAEAHYAAQIAAAEMRQCGIBAAAIRSWSvRD68t8+wGYY77L3Ma1zipGlSxGUu5hXt7p7ucZZ4SfIHVO4pUls8yJo13VZ5Lm4ycZZUls0ej4fuB0VI6X8kF3D1VYxXEVlkAIAADsAAIEAAACGIoBDw3wWqT6vBBmS88Qi5yzjC4XydEvLpQbm0opbtmDrOpSTslTmveWP+hoScKXqqSdSa3Sxx8I572V1V0woRcVJ4cscDVCjWrxqShOjcLr1fs+6LqVIUISzNLfCywOWFhQt7qNatUdaslhTkktPwhXt0pPTSlldzKpUc5OTe3RGLW+TQK0ZV5Rm5YnjDb6nZRr0rWljWp1PbocXumZ2S/FXTqLeDSin+bGcsD16TcoKUvqluyhiAQABB2AAECAYgAcY53fA4R1Pfg0fKXQBKLT5WO2CZupj0aH8lNktkCUW4rz3CbTztHCRNVLaS2fdCnLCZipyjTnvzxllDr3CWjDWo4arbbcnlt7Fyk8Za39jPHV8sozcTKbUU23hLlm1RqMW28JHK1501rj6FxF9X3ZRgqU7r1VJSjRz6YLbWu7/g9KwSVR4Swo9OgoWdWrFyUo47NnXbUfJp6W05Pd4YGgiuc43x2EwEAAQdYDAgQAAGsVpQSFq2IlLsQNyIyZzqLqYSm87Tx7Mo2qT27nNVm8JdCZTn+b9jN6ns9y4B4ysMbRUKTk0lyddOlGnxu+5R5sravVazDC7N8Fws5OSjqi9+h3VJqO2d+w6eneWnfOeNxo4LyNzb7002nt6d/wBjS7hO18LnWb/z4WXzjLR6ainvLkxr2yq0J0nuprfLyZ1Hzlj4hUp1vVLaXOT2aV/Cbw0srY8h+DV7f/JXq0qdNPeTb/g9yzsKdBa08ylvqa/4RVbRlHCcsRb6NAaYiu36gQMBgAhDABGU5Y4NiZRUuQOKrPPO3ujF56bnZK3b4Zk7aXZMo5/V+X9x+r2XwjdW0uyRcbbfMn+iKFbQxmbNKtRU4t4y8ZLk1COy+DjrueiTjvPGxEcte6VOXmzy5Y+lHdQjOMZucsubwkuhwWVnoqedWxOu/tH+9z1aaxu92Kuts42HqwRKUYxcptKKWW29keNeeKTuc2/hOalT/apjaK9skWc3r4jxivK88StfDqbzDUp1cf3tl/Y9xtt4R5/hXhkbKDqVWqlzPec+T0eCNdWfmJ0Lq3n5AGwKw2AAAQDEAgGAEgMAJB7LLKxgiT3Ayqy2wuWYOCS0o1kvVl9ELHXoVBTgkjG+8SoeHQTqtynL6YR5f/h5934tOvU/C+FLzKreHUx6Yr2/ng0sfCqdB+ddyVxcZ3lN6kvuTXSc5N6ZKhe+NaZ3c1QtG8xpx5f9/qPXtbajaUlToQ0Ll75bDW3wmxxhJ/Uxhe7fJ5GuvjoDlhcZEoLruDayGCc5dEgJywA7AGIAEMAEIYAIQwATZEmVJGcvcCZHHfWsLyg6MqlSCe70PGfn2OttC0t8L9WUctpaRtaPlU4qCWPVneXydCjFPL3fuaKmusvsPTBdPuFttu1GtdB5m+Fj5LylwLIROJdWLR3bKyLIC0rsA8gB2AMCBAAAIBiAQDFgCWzKpOS4NWiXHJRxyqyRm67OyVJPoZSt0+hRj54/OG7YX4d+4D80PMJ8hh5TArzA8wjy2GhgaawMtLAD2AGBgIAAoQDEACGAEgMAJwLBQgJ0i0liAjSLSixAQ4oTgiwKMvLQGgAf/9k=",
        name: "Gucci Shop",
        
    },
    {
      image:
        "data:image/jpeg;base64,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",
        name: "NghinhJR Shop",
    },
    {
      image:
        "data:image/jpeg;base64,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",
        name: "NghinhJR Shop",
    },
  ];
  return (
    <View style={{ }}>
      <ListShop data={default_data} />
    </View>
  );
};
export default Shop;
